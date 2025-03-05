import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { sellingUnitHierarchies } from "./sellingUnitHierarchies";

export const manufacturedSellingUnitHierarchies = pgTable(
  "manufactured_selling_unit_hierarchies_bt",
  {
    id: uuid("id"),
    sellingUnitHierarchyId: uuid("id")
      .notNull()
      .references(() => sellingUnitHierarchies.id),
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
  (table) => ({
    pk: primaryKey({
      name: "man_sel_uni_hie_bt_pk",
      columns: [table.id],
    }),
  })
);

export const manufacturedSellingUnitHierarchiesRelations = relations(
  manufacturedSellingUnitHierarchies,
  ({ one, many }) => ({
    sellingUnitHierarchy: one(sellingUnitHierarchies, {
      fields: [manufacturedSellingUnitHierarchies.sellingUnitHierarchyId],
      references: [sellingUnitHierarchies.id],
      relationName: "man_sel_uni_hie_bt_fk_sel_uni_hie",
    }),
  })
);

export type ManufacturedSellingUnitHierarchy =
  typeof manufacturedSellingUnitHierarchies.$inferSelect;
export type NewManufacturedSellingUnitHierarchy =
  typeof manufacturedSellingUnitHierarchies.$inferInsert;
