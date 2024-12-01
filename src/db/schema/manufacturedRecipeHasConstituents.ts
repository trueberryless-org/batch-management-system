import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { manufacturedConstituents } from "./manufacturedConstituents";
import { manufacturedRecipes } from "./manufacturedRecipes";

export const manufacturedRecipeHasConstituents = pgTable(
  "manufactured_recipe_has_constituents_jt",
  {
    manufacturedConstituentId: uuid("manufactured_constituent_id").references(
      () => manufacturedConstituents.id,
      {
        onDelete: "cascade",
        onUpdate: "cascade",
      }
    ),
    manufacturedRecipeId: uuid("manufactured_recipe_id").references(
      () => manufacturedRecipes.id,
      {
        onDelete: "cascade",
        onUpdate: "cascade",
      }
    ),
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
      columns: [table.manufacturedConstituentId, table.manufacturedRecipeId],
    }),
  })
);

export const manufacturedRecipeHasConstituentsRelations = relations(
  manufacturedRecipeHasConstituents,
  ({ one, many }) => ({
    manufacturedConstituent: one(manufacturedConstituents, {
      fields: [manufacturedRecipeHasConstituents.manufacturedConstituentId],
      references: [manufacturedConstituents.id],
    }),
    manufacturedRecipe: one(manufacturedRecipes, {
      fields: [manufacturedRecipeHasConstituents.manufacturedRecipeId],
      references: [manufacturedRecipes.id],
    }),
  })
);

export type ManufacturedRecipeHasConstituent =
  typeof manufacturedRecipeHasConstituents.$inferSelect;
export type NewManufacturedRecipeHasConstituent =
  typeof manufacturedRecipeHasConstituents.$inferInsert;
