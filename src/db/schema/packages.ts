import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { nestables } from "./nestables";
import { packageHierarchies } from "./packageHierarchies";

export const packages = pgTable("packages", {
  id: uuid("id")
    .primaryKey()
    .references(() => nestables.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
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
});

export const packagesRelations = relations(packages, ({ one, many }) => ({
  nestable: one(nestables, {
    fields: [packages.id],
    references: [nestables.id],
  }),
  hierarchy: one(packageHierarchies),
}));

export type Package = typeof packages.$inferSelect;
export type NewPackage = typeof packages.$inferInsert;
