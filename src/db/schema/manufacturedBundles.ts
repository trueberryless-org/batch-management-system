import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { bundles } from "./bundles";

export const manufacturedBundles = pgTable(
  "manufactured_bundles_bt",
  {
    id: uuid("id"),
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
  },
  (table) => ({
    pk: primaryKey({
      name: "man_bun_bt",
      columns: [table.id],
    }),
  })
);

export const manufacturedBundlesRelations = relations(
  manufacturedBundles,
  ({ one, many }) => ({
    bundle: one(bundles, {
      fields: [manufacturedBundles.bundleId],
      references: [bundles.id],
      relationName: "man_bun_bt_fk_bun_bt",
    }),
  })
);

export type ManufacturedBundle = typeof manufacturedBundles.$inferSelect;
export type NewManufacturedBundle = typeof manufacturedBundles.$inferInsert;
