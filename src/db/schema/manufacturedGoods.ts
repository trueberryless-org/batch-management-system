import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { goods } from "./goods";

export const manufacturedGoods = pgTable("manufactured_goods_bt", {
    id: uuid("id").primaryKey().defaultRandom(),
    goodId: uuid("id")
        .notNull()
        .references(() => goods.id),
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

export const manufacturedGoodsRelations = relations(manufacturedGoods, ({ one, many }) => ({
    good: one(goods, {
        fields: [manufacturedGoods.goodId],
        references: [goods.id],
    }),
}));

export type ManufacturedGood = typeof manufacturedGoods.$inferSelect;
export type NewManufacturedGood = typeof manufacturedGoods.$inferInsert;
