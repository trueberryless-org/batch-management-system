import { relations, sql } from "drizzle-orm";
import {
  date,
  doublePrecision,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { sellingUnits } from "./sellingUnits";

export const batches = pgTable(
  "batches_bt",
  {
    id: uuid("id"),
    number: text("number").notNull(),
    expiresOn: date("expires_on")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP + INTERVAL '1 year'`),
    note: text("note"),
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
      name: "bat_bt_pk",
      columns: [table.id],
    }),
  })
);

export const batchesRelations = relations(batches, ({ one, many }) => ({
  sellingUnits: many(sellingUnits),
}));

export type Batch = typeof batches.$inferSelect;
export type NewBatch = typeof batches.$inferInsert;
