import { relations } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import { constituents } from "./constituents";

export const ingredients = pgTable(
  "ingredients",
  {
    id: uuid("id"),
    number: text("number").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    isVegan: boolean("is_vegan").notNull().default(false),
    isVegetarian: boolean("is_vegetarian").notNull().default(false),
    isTurkishHalal: boolean("is_turkish_halal").notNull().default(true),
    isJewishKosher: boolean("is_jewish_kosher").notNull().default(true),
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
      name: "ing_pk",
      columns: [table.id],
    }),
    fkConBt: foreignKey({
      name: "fk_ing_con_bt",
      columns: [table.id],
      foreignColumns: [constituents.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
    unq: unique("ing_num_uq").on(table.number),
  })
);

export const ingredientsRelations = relations(ingredients, ({ one, many }) => ({
  constituent: one(constituents, {
    fields: [ingredients.id],
    references: [constituents.id],
    relationName: "ing_fk_con_bt",
  }),
}));

export type Ingredient = typeof ingredients.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;
