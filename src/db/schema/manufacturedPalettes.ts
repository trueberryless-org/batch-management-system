import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { tenants } from "./tenants";

export const manufacturedPalettes = pgTable("manufactured_palettes", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
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
    tenantId: uuid("tenant_id")
        .notNull()
        .references(() => tenants.id, { onDelete: "cascade" }),
});

export const manufacturedPalettesRelations = relations(manufacturedPalettes, ({ one, many }) => ({
    tenant: one(tenants, {
        fields: [manufacturedPalettes.tenantId],
        references: [tenants.id],
    }),
}));

export type ManufacturedPalette = typeof manufacturedPalettes.$inferSelect;
export type NewManufacturedPalette = typeof manufacturedPalettes.$inferInsert;
