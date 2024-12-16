import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { manufacturedRecipeHasConstituents } from "./manufacturedRecipeHasConstituents";
import { recipes } from "./recipes";

export const manufacturedRecipes = pgTable("manufactured_recipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  recipeId: uuid("id")
    .notNull()
    .references(() => recipes.id),
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

export const manufacturedRecipesRelations = relations(
  manufacturedRecipes,
  ({ one, many }) => ({
    recipe: one(recipes, {
      fields: [manufacturedRecipes.recipeId],
      references: [recipes.id],
      relationName: "man_rec_fk_rec",
    }),
    manufacturedRecipeHasConstituents: many(manufacturedRecipeHasConstituents),
  })
);

export type ManufacturedRecipe = typeof manufacturedRecipes.$inferSelect;
export type NewManufacturedRecipe = typeof manufacturedRecipes.$inferInsert;
