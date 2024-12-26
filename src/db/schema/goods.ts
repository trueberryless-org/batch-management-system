import { relations } from "drizzle-orm";
import {
  AnyPgColumn,
  foreignKey,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import { constituents } from "./constituents";
import { recipes } from "./recipes";

export const goods = pgTable(
  "goods_bt",
  {
    id: uuid("id"),
    currentRecipeId: uuid("current_recipe_id"),
    number: text("number").notNull(),
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
      name: "goo_bt_pk",
      columns: [table.id],
    }),
    fkConBt: foreignKey({
      name: "fk_goo_bt_con_bt",
      columns: [table.id],
      foreignColumns: [constituents.id],
    }),
    fkRec: foreignKey({
      name: "fk_goo_bt_rec",
      columns: [table.currentRecipeId],
      foreignColumns: [recipes.id],
    }),
    unq: unique("goo_bt_num_uq").on(table.number),
  })
);

export const goodsRelations = relations(goods, ({ one, many }) => ({
  constituent: one(constituents, {
    fields: [goods.id],
    references: [constituents.id],
    relationName: "goo_bt_fk_con_bt",
  }),
  currentRecipe: one(recipes, {
    fields: [goods.currentRecipeId],
    references: [recipes.id],
    relationName: "goo_bt_fk_rec",
  }),
  recipes: many(recipes),
}));

export type Good = typeof goods.$inferSelect;
export type NewGood = typeof goods.$inferInsert;
