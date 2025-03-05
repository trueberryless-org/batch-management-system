import { relations } from "drizzle-orm";
import {
  foreignKey,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { packages } from "./packages";
import { palettes } from "./palettes";

export const packageHierarchies = pgTable(
  "package_hierarchies",
  {
    id: uuid("id"),
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
  },
  (table) => ({
    pk: primaryKey({
      name: "pac_hie_pk",
      columns: [table.id],
    }),
    fkPac: foreignKey({
      name: "fk_pac_hie_pac_bt",
      columns: [table.id],
      foreignColumns: [packages.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  })
);

export const packageHierarchiesRelations = relations(
  packageHierarchies,
  ({ one, many }) => ({
    package: one(packages, {
      fields: [packageHierarchies.id],
      references: [packages.id],
      relationName: "pac_hie_fk_pac",
    }),
    parent: one(palettes, {
      fields: [packageHierarchies.parentId],
      references: [palettes.id],
      relationName: "pac_hie_fk_pal",
    }),
  })
);

export type PackageHierarchy = typeof packageHierarchies.$inferSelect;
export type NewPackageHierarchy = typeof packageHierarchies.$inferInsert;
