import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { bundles } from "./bundles";

export const manufacturedBundles = pgTable("manufactured_bundles_bt", {
  id: uuid("id").primaryKey().defaultRandom(),
  bundleId: uuid("bundle_id")
    .notNull()
    .references(() => bundles.id),
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

export const manufacturedBundlesRelations = relations(
  manufacturedBundles,
  ({ one, many }) => ({
    bundle: one(bundles, {
      fields: [manufacturedBundles.bundleId],
      references: [bundles.id],
    }),
  })
);

export type ManufacturedBundle = typeof manufacturedBundles.$inferSelect;
export type NewManufacturedBundle = typeof manufacturedBundles.$inferInsert;
