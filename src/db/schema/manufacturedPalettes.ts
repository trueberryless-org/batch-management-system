import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { palettes } from "./palettes";

export const manufacturedPalettes = pgTable("manufactured_palettes", {
  id: uuid("id").primaryKey().defaultRandom(),
  paletteId: uuid("id")
    .notNull()
    .references(() => palettes.id),
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

export const manufacturedPalettesRelations = relations(
  manufacturedPalettes,
  ({ one, many }) => ({
    palette: one(palettes, {
      fields: [manufacturedPalettes.paletteId],
      references: [palettes.id],
    }),
  })
);

export type ManufacturedPalette = typeof manufacturedPalettes.$inferSelect;
export type NewManufacturedPalette = typeof manufacturedPalettes.$inferInsert;
