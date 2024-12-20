import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import { constituents } from "./constituents";

export const ingredients = pgTable(
  "ingredients",
  {
    id: uuid("id")
      .primaryKey()
      .references(() => constituents.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
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
  (t) => ({
    unq: unique().on(t.number),
  })
);

export const ingredientsRelations = relations(ingredients, ({ one, many }) => ({
  constituent: one(constituents, {
    fields: [ingredients.id],
    references: [constituents.id],
  }),
}));

export type Ingredient = typeof ingredients.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;
