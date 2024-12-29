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

export const palettes = pgTable(
  "palettes",
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
      name: "pal_pk",
      columns: [table.id],
    }),
    fkNesBt: foreignKey({
      name: "fk_pal_nes_bt",
      columns: [table.id],
      foreignColumns: [nestables.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  })
);

export const palettesRelations = relations(palettes, ({ one, many }) => ({
  nestable: one(nestables, {
    fields: [palettes.id],
    references: [nestables.id],
    relationName: "pal_fk_nes_bt",
  }),
  children: many(packageHierarchies),
}));

export type Palette = typeof palettes.$inferSelect;
export type NewPalette = typeof palettes.$inferInsert;
