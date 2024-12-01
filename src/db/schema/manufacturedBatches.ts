import { relations } from "drizzle-orm";
import { date, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { batches } from "./batches";

export const manufacturedBatches = pgTable("manufactured_batches", {
    id: uuid("id")
        .primaryKey()
        .references(() => batches.id, { onDelete: "cascade", onUpdate: "cascade" }),
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
});

export const manufacturedBatchesRelations = relations(manufacturedBatches, ({ one, many }) => ({
    batch: one(batches, {
        fields: [manufacturedBatches.id],
        references: [batches.id],
    }),
}));

export type ManufacturedBatch = typeof manufacturedBatches.$inferSelect;
export type NewManufacturedBatch = typeof manufacturedBatches.$inferInsert;
