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
import { rawMaterials } from "./rawMaterials";

export const receivedBatches = pgTable(
  "received_batches",
  {
    id: uuid("id"),
    deliveredOn: date("delivered_on").notNull().defaultNow(),
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
      name: "rec_bat_pk",
      columns: [table.id],
    }),
    fkBatBt: foreignKey({
      name: "fk_rec_bat_bat_bt",
      columns: [table.id],
      foreignColumns: [batches.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  })
);

export const receivedBatchesRelations = relations(
  receivedBatches,
  ({ one, many }) => ({
    batch: one(batches, {
      fields: [receivedBatches.id],
      references: [batches.id],
      relationName: "rec_bat_fk_bat_bt",
    }),
    rawMaterials: many(rawMaterials),
  })
);

export type ReceivedBatch = typeof receivedBatches.$inferSelect;
export type NewReceivedBatch = typeof receivedBatches.$inferInsert;
