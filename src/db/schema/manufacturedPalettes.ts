import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { palettes } from "./palettes";

export const manufacturedPalettes = pgTable(
  "manufactured_palettes",
  {
    id: uuid("id"),
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
  },
  (table) => ({
    pk: primaryKey({
      name: "man_pal_pk",
      columns: [table.id],
    }),
  })
);

export const manufacturedPalettesRelations = relations(
  manufacturedPalettes,
  ({ one, many }) => ({
    palette: one(palettes, {
      fields: [manufacturedPalettes.paletteId],
      references: [palettes.id],
      relationName: "man_pal_fk_pal",
    }),
  })
);

export type ManufacturedPalette = typeof manufacturedPalettes.$inferSelect;
export type NewManufacturedPalette = typeof manufacturedPalettes.$inferInsert;
