import { relations } from "drizzle-orm";
import { date, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { batches } from "./batches";
import { rawMaterials } from "./rawMaterials";

export const receivedBatches = pgTable("received_batches", {
    id: uuid("id")
        .primaryKey()
        .references(() => batches.id, { onDelete: "cascade", onUpdate: "cascade" }),
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
});

export const receivedBatchesRelations = relations(receivedBatches, ({ one, many }) => ({
    batch: one(batches, {
        fields: [receivedBatches.id],
        references: [batches.id],
    }),
    rawMaterials: many(rawMaterials),
}));

export type ReceivedBatch = typeof receivedBatches.$inferSelect;
export type NewReceivedBatch = typeof receivedBatches.$inferInsert;
