import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { nestables } from "./nestables";

export const manufacturedNestables = pgTable("manufactured_nestables_bt", {
  id: uuid("id").primaryKey().defaultRandom(),
  nestableId: uuid("id")
    .notNull()
    .references(() => nestables.id),
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

export const manufacturedNestablesRelations = relations(
  manufacturedNestables,
  ({ one, many }) => ({
    nestable: one(nestables, {
      fields: [manufacturedNestables.nestableId],
      references: [nestables.id],
    }),
  })
);

export type ManufacturedNestable = typeof manufacturedNestables.$inferSelect;
export type NewManufacturedNestable = typeof manufacturedNestables.$inferInsert;
