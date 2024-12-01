import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { doughs } from "./doughs";

export const manufacturedDoughs = pgTable("manufactured_doughs", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    doughId: uuid("id")
        .notNull()
        .references(() => doughs.id),
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

export const manufacturedDoughsRelations = relations(manufacturedDoughs, ({ one, many }) => ({
    dough: one(doughs, {
        fields: [manufacturedDoughs.doughId],
        references: [doughs.id],
    }),
}));

export type ManufacturedDough = typeof manufacturedDoughs.$inferSelect;
export type NewManufacturedDough = typeof manufacturedDoughs.$inferInsert;
