import { relations } from "drizzle-orm";
import {
  foreignKey,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { manufacturedConstituents } from "./manufacturedConstituents";
import { manufacturedRecipes } from "./manufacturedRecipes";

export const manufacturedRecipeHasConstituents = pgTable(
  "manufactured_recipe_has_constituents_jt",
  {
    manufacturedConstituentId: uuid("manufactured_constituent_id"),
    manufacturedRecipeId: uuid("manufactured_recipe_id"),
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
      name: "man_rec_has_con_jt_pk",
      columns: [table.manufacturedConstituentId, table.manufacturedRecipeId],
    }),
    fkManConBt: foreignKey({
      name: "fk_man_rec_has_con_jt_man_con_bt",
      columns: [table.manufacturedConstituentId],
      foreignColumns: [manufacturedConstituents.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
    fkManRecId: foreignKey({
      name: "fk_man_rec_has_con_jt_man_rec",
      columns: [table.manufacturedRecipeId],
      foreignColumns: [manufacturedRecipes.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  })
);

export const manufacturedRecipeHasConstituentsRelations = relations(
  manufacturedRecipeHasConstituents,
  ({ one, many }) => ({
    manufacturedConstituent: one(manufacturedConstituents, {
      fields: [manufacturedRecipeHasConstituents.manufacturedConstituentId],
      references: [manufacturedConstituents.id],
      relationName: "man_rec_has_con_jt_fk_man_con_bt",
    }),
    manufacturedRecipe: one(manufacturedRecipes, {
      fields: [manufacturedRecipeHasConstituents.manufacturedRecipeId],
      references: [manufacturedRecipes.id],
      relationName: "man_rec_has_con_jt_fk_man_rec",
    }),
  })
);

export type ManufacturedRecipeHasConstituent =
  typeof manufacturedRecipeHasConstituents.$inferSelect;
export type NewManufacturedRecipeHasConstituent =
  typeof manufacturedRecipeHasConstituents.$inferInsert;
