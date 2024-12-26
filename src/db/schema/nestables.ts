import { relations } from "drizzle-orm";
import {
  foreignKey,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { bundles } from "./bundles";
import { packages } from "./packages";
import { palettes } from "./palettes";
import { sellingUnitHierarchies } from "./sellingUnitHierarchies";

export const nestables = pgTable(
  "nestables_bt",
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
      name: "nes_bt_pk",
      columns: [table.id],
    }),
    fkBunBt: foreignKey({
      name: "fk_nes_bt_bun_bt",
      columns: [table.id],
      foreignColumns: [bundles.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  })
);

export const nestablesRelations = relations(nestables, ({ one, many }) => ({
  bundle: one(bundles, {
    fields: [nestables.id],
    references: [bundles.id],
    relationName: "nes_bt_fk_bun_bt",
  }),
  package: one(packages),
  palette: one(palettes),
  children: many(sellingUnitHierarchies),
}));

export type Nestable = typeof nestables.$inferSelect;
export type NewNestable = typeof nestables.$inferInsert;
