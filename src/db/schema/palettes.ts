import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { nestables } from "./nestables";
import { packageHierarchies } from "./packageHierarchies";

export const palettes = pgTable("palettes", {
  id: uuid("id")
    .primaryKey()
    .references(() => nestables.id, {
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

export const palettesRelations = relations(palettes, ({ one, many }) => ({
  nestable: one(nestables, {
    fields: [palettes.id],
    references: [nestables.id],
  }),
  children: many(packageHierarchies),
}));

export type Palette = typeof palettes.$inferSelect;
export type NewPalette = typeof palettes.$inferInsert;
