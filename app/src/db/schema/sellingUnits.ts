import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { bundles } from "./bundles";
import { sellingUnitHierarchies } from "./sellingUnitHierarchies";

export const sellingUnits = pgTable("selling_units", {
  id: uuid("id")
    .primaryKey()
    .references(() => bundles.id, { onDelete: "cascade", onUpdate: "cascade" }),
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

export const sellingUnitsRelations = relations(
  sellingUnits,
  ({ one, many }) => ({
    bundle: one(bundles, {
      fields: [sellingUnits.id],
      references: [bundles.id],
    }),
    hierarchy: one(sellingUnitHierarchies),
  })
);

export type SellingUnit = typeof sellingUnits.$inferSelect;
export type NewSellingUnit = typeof sellingUnits.$inferInsert;
