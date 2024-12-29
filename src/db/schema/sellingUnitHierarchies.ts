import { relations } from "drizzle-orm";
import {
  foreignKey,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { nestables } from "./nestables";
import { sellingUnits } from "./sellingUnits";

export const sellingUnitHierarchies = pgTable(
  "selling_unit_hierarchies",
  {
    id: uuid("id"),
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
  },
  (table) => ({
    pk: primaryKey({
      name: "sel_uni_hie_pk",
      columns: [table.id],
    }),
    fkSelUni: foreignKey({
      name: "fk_sel_uni_hie_sel_uni",
      columns: [table.id],
      foreignColumns: [sellingUnits.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  })
);

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
