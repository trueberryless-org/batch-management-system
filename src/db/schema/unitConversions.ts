import { relations } from "drizzle-orm";
import {
  doublePrecision,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { units } from "./units";

export const unitConversions = pgTable(
  "unit_conversions_jt",
  {
    fromUnitId: uuid("from_unit_id").references(() => units.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    toUnitId: uuid("to_unit_id").references(() => units.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    conversionFactor: doublePrecision("conversion_factor").notNull(),
    description: text("description"),
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
      name: "uni_con_jt_pk",
      columns: [table.fromUnitId, table.toUnitId],
    }),
  })
);

export const unitConversionsRelations = relations(
  unitConversions,
  ({ one }) => ({
    fromUnit: one(units, {
      fields: [unitConversions.fromUnitId],
      references: [units.id],
      relationName: "uni_con_jt_fk_from_unit",
    }),
    toUnit: one(units, {
      fields: [unitConversions.toUnitId],
      references: [units.id],
      relationName: "uni_con_jt_fk_to_unit",
    }),
  })
);

export type UnitConversion = typeof unitConversions.$inferSelect;
export type NewUnitConversion = typeof unitConversions.$inferInsert;
