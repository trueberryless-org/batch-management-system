import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { packages } from "./packages";
import { palettes } from "./palettes";

export const packageHierarchies = pgTable("package_hierarchies", {
  id: uuid("id")
    .primaryKey()
    .references(() => packages.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  parentId: uuid("parent_id")
    .notNull()
    .references(() => palettes.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
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

export const packageHierarchiesRelations = relations(
  packageHierarchies,
  ({ one, many }) => ({
    package: one(packages, {
      fields: [packageHierarchies.id],
      references: [packages.id],
    }),
    parent: one(palettes, {
      fields: [packageHierarchies.parentId],
      references: [palettes.id],
    }),
  })
);

export type PackageHierarchy = typeof packageHierarchies.$inferSelect;
export type NewPackageHierarchy = typeof packageHierarchies.$inferInsert;
