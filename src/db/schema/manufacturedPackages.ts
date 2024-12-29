import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { packages } from "./packages";

export const manufacturedPackages = pgTable(
  "manufactured_packages",
  {
    id: uuid("id"),
    packageId: uuid("id")
      .notNull()
      .references(() => packages.id),
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
      name: "man_pac_pk",
      columns: [table.id],
    }),
  })
);

export const manufacturedPackagesRelations = relations(
  manufacturedPackages,
  ({ one, many }) => ({
    package: one(packages, {
      fields: [manufacturedPackages.packageId],
      references: [packages.id],
      relationName: "man_pac_fk_pac",
    }),
  })
);

export type ManufacturedPackage = typeof manufacturedPackages.$inferSelect;
export type NewManufacturedPackage = typeof manufacturedPackages.$inferInsert;
