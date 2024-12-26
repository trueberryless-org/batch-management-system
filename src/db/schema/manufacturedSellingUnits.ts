import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { sellingUnits } from "./sellingUnits";

export const manufacturedSellingUnits = pgTable(
  "manufactured_selling_units",
  {
    id: uuid("id"),
    sellingUnitId: uuid("id")
      .notNull()
      .references(() => sellingUnits.id),
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
      name: "man_sel_uni_pk",
      columns: [table.id],
    }),
  })
);

export const manufacturedSellingUnitsRelations = relations(
  manufacturedSellingUnits,
  ({ one, many }) => ({
    sellingUnit: one(sellingUnits, {
      fields: [manufacturedSellingUnits.sellingUnitId],
      references: [sellingUnits.id],
      relationName: "man_sel_uni_fk_sel_uni",
    }),
  })
);

export type ManufacturedSellingUnit =
  typeof manufacturedSellingUnits.$inferSelect;
export type NewManufacturedSellingUnit =
  typeof manufacturedSellingUnits.$inferInsert;
