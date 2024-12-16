import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { nestables } from "./nestables";
import { sellingUnits } from "./sellingUnits";

export const sellingUnitHierarchies = pgTable("selling_unit_hierarchies", {
  id: uuid("id")
    .primaryKey()
    .references(() => sellingUnits.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  parentId: uuid("parent_id")
    .notNull()
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

export const sellingUnitHierarchiesRelations = relations(
  sellingUnitHierarchies,
  ({ one, many }) => ({
    sellingUnit: one(sellingUnits, {
      fields: [sellingUnitHierarchies.id],
      references: [sellingUnits.id],
      relationName: "sel_uni_hie_fk_sel_uni",
    }),
    parent: one(nestables, {
      fields: [sellingUnitHierarchies.parentId],
      references: [nestables.id],
      relationName: "sel_uni_hie_fk_nes_bt",
    }),
  })
);

export type SellingUnitHierarchy = typeof sellingUnitHierarchies.$inferSelect;
export type NewSellingUnitHierarchy =
  typeof sellingUnitHierarchies.$inferInsert;
