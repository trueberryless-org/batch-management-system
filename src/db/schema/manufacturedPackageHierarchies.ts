import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { packageHierarchies } from "./packageHierarchies";

export const manufacturedPackageHierarchies = pgTable(
  "manufactured_package_hierarchies_bt",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    packageHierarchyId: uuid("id")
      .notNull()
      .references(() => packageHierarchies.id),
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
  }
);

export const manufacturedPackageHierarchiesRelations = relations(
  manufacturedPackageHierarchies,
  ({ one, many }) => ({
    packageHierarchy: one(packageHierarchies, {
      fields: [manufacturedPackageHierarchies.packageHierarchyId],
      references: [packageHierarchies.id],
    }),
  })
);

export type ManufacturedPackageHierarchy =
  typeof manufacturedPackageHierarchies.$inferSelect;
export type NewManufacturedPackageHierarchy =
  typeof manufacturedPackageHierarchies.$inferInsert;
