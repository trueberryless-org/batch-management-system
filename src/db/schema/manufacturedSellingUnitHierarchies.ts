import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { tenants } from "./tenants";

export const manufacturedSellingUnitHierarchies = pgTable("manufactured_selling_unit_hierarchies_bt", {
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
        .references(() => tenants.id),
});

export const manufacturedSellingUnitHierarchiesRelations = relations(
    manufacturedSellingUnitHierarchies,
    ({ one, many }) => ({
        tenant: one(tenants, {
            fields: [manufacturedSellingUnitHierarchies.tenantId],
            references: [tenants.id],
        }),
    }),
);

export type ManufacturedSellingUnitHierarchy = typeof manufacturedSellingUnitHierarchies.$inferSelect;
export type NewManufacturedSellingUnitHierarchy = typeof manufacturedSellingUnitHierarchies.$inferInsert;
