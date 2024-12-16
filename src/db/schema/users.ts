import { relations, sql } from "drizzle-orm";
import {
  foreignKey,
  pgPolicy,
  pgSchema,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { authUsers, authenticatedRole } from "drizzle-orm/supabase";

import { settings } from "./settings";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().notNull(),
    insertedAt: timestamp("inserted_at", {
      mode: "date",
      precision: 3,
      withTimezone: false,
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      precision: 3,
      withTimezone: false,
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      // reference to the auth table from Supabase
      foreignColumns: [authUsers.id],
      name: "use_fk",
    }).onDelete("cascade"),
  ]
).enableRLS();

export const usersRelations = relations(users, ({ one, many }) => ({
  user: one(authUsers, {
    fields: [users.id],
    references: [authUsers.id],
    relationName: "use_fk_aut_use",
  }),
  settings: many(settings),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
