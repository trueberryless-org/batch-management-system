import { relations } from "drizzle-orm";
import {
  foreignKey,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { bundles } from "./bundles";
import { sellingUnitHierarchies } from "./sellingUnitHierarchies";

export const sellingUnits = pgTable(
  "selling_units",
  {
    id: uuid("id"),
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
      name: "sel_uni_pk",
      columns: [table.id],
    }),
    fkBunBt: foreignKey({
      name: "fk_sel_uni_bun_bt",
      columns: [table.id],
      foreignColumns: [bundles.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  })
);

export const sellingUnitsRelations = relations(
  sellingUnits,
  ({ one, many }) => ({
    bundle: one(bundles, {
      fields: [sellingUnits.id],
      references: [bundles.id],
      relationName: "sel_uni_fk_bun_bt",
    }),
    hierarchy: one(sellingUnitHierarchies),
  })
);

export type SellingUnit = typeof sellingUnits.$inferSelect;
export type NewSellingUnit = typeof sellingUnits.$inferInsert;
