import { relations } from "drizzle-orm";
import { AnyPgColumn, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { goods } from "./goods";
import { recipes } from "./recipes";

export const doughs = pgTable("doughs", {
    id: uuid("id")
        .primaryKey()
        .references(() => goods.id, { onDelete: "cascade", onUpdate: "cascade" }),
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

export const doughsRelations = relations(doughs, ({ one }) => ({
    good: one(goods, {
        fields: [doughs.id],
        references: [goods.id],
    }),
}));

export type Dough = typeof doughs.$inferSelect;
export type NewDough = typeof doughs.$inferInsert;
