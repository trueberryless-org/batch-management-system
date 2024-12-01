import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { products } from "./products";

export const manufacturedProducts = pgTable("manufactured_products", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("id")
    .notNull()
    .references(() => products.id),
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

export const manufacturedProductsRelations = relations(
  manufacturedProducts,
  ({ one, many }) => ({
    product: one(products, {
      fields: [manufacturedProducts.productId],
      references: [products.id],
    }),
  })
);

export type ManufacturedProduct = typeof manufacturedProducts.$inferSelect;
export type NewManufacturedProduct = typeof manufacturedProducts.$inferInsert;
