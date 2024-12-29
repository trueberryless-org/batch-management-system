import { relations } from "drizzle-orm";
import {
  foreignKey,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { constituents } from "./constituents";
import { recipes } from "./recipes";

export const recipeHasConstituents = pgTable(
  "recipe_has_constituents_jt",
  {
    constituentId: uuid("constituent_id"),
    recipeId: uuid("recipe_id"),
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
      name: "rec_has_con_jt_pk",
      columns: [table.constituentId, table.recipeId],
    }),
    fkConBt: foreignKey({
      name: "fk_rec_has_con_jt_con_bt",
      columns: [table.constituentId],
      foreignColumns: [constituents.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
    fkRec: foreignKey({
      name: "fk_rec_has_con_jt_rec",
      columns: [table.recipeId],
      foreignColumns: [recipes.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  })
);

export const recipeHasConstituentsRelations = relations(
  recipeHasConstituents,
  ({ one }) => ({
    constituent: one(constituents, {
      fields: [recipeHasConstituents.constituentId],
      references: [constituents.id],
      relationName: "rec_has_con_jt_fk_con_bt",
    }),
    recipe: one(recipes, {
      fields: [recipeHasConstituents.recipeId],
      references: [recipes.id],
      relationName: "rec_has_con_jt_fk_rec",
    }),
  })
);

export type RecipeHasConstituent = typeof recipeHasConstituents.$inferSelect;
export type NewRecipeHasConstituent = typeof recipeHasConstituents.$inferInsert;
