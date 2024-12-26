import { relations } from "drizzle-orm";
import {
  date,
  foreignKey,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { batches } from "./batches";

export const manufacturedBatches = pgTable(
  "manufactured_batches",
  {
    id: uuid("id"),
    manufacturedOn: date("manufactured_on").notNull().defaultNow(),
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
      name: "man_bat_pk",
      columns: [table.id],
    }),
    fkBatBt: foreignKey({
      name: "fk_man_bat_bat_bt",
      columns: [table.id],
      foreignColumns: [batches.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  })
);

export const manufacturedBatchesRelations = relations(
  manufacturedBatches,
  ({ one, many }) => ({
    batch: one(batches, {
      fields: [manufacturedBatches.id],
      references: [batches.id],
      relationName: "man_bat_fk_bat_bt",
    }),
  })
);

export type ManufacturedBatch = typeof manufacturedBatches.$inferSelect;
export type NewManufacturedBatch = typeof manufacturedBatches.$inferInsert;
