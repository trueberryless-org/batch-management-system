import { relations } from "drizzle-orm";
import {
  foreignKey,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { nestables } from "./nestables";
import { packageHierarchies } from "./packageHierarchies";

export const packages = pgTable(
  "packages",
  {
    id: uuid("id"),
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
      name: "pac_pk",
      columns: [table.id],
    }),
    fkNesBt: foreignKey({
      name: "fk_pac_nes_bt",
      columns: [table.id],
      foreignColumns: [nestables.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  })
);

export const packagesRelations = relations(packages, ({ one, many }) => ({
  nestable: one(nestables, {
    fields: [packages.id],
    references: [nestables.id],
    relationName: "pac_fk_nes_bt",
  }),
  hierarchy: one(packageHierarchies),
}));

export type Package = typeof packages.$inferSelect;
export type NewPackage = typeof packages.$inferInsert;
