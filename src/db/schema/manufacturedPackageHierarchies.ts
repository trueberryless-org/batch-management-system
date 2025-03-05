import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { packageHierarchies } from "./packageHierarchies";

export const manufacturedPackageHierarchies = pgTable(
  "manufactured_package_hierarchies_bt",
  {
    id: uuid("id"),
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
  },
  (table) => ({
    pk: primaryKey({
      name: "man_pac_hie_bt_pk",
      columns: [table.id],
    }),
  })
);

export const manufacturedPackageHierarchiesRelations = relations(
  manufacturedPackageHierarchies,
  ({ one, many }) => ({
    packageHierarchy: one(packageHierarchies, {
      fields: [manufacturedPackageHierarchies.packageHierarchyId],
      references: [packageHierarchies.id],
      relationName: "man_pac_hie_bt_fk_pac_hie",
    }),
  })
);

export type ManufacturedPackageHierarchy =
  typeof manufacturedPackageHierarchies.$inferSelect;
export type NewManufacturedPackageHierarchy =
  typeof manufacturedPackageHierarchies.$inferInsert;
