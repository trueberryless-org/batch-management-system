import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { packages } from "./packages";

export const manufacturedPackages = pgTable("manufactured_packages", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    packageId: uuid("id")
        .notNull()
        .references(() => packages.id),
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

export const manufacturedPackagesRelations = relations(manufacturedPackages, ({ one, many }) => ({
    package: one(packages, {
        fields: [manufacturedPackages.packageId],
        references: [packages.id],
    }),
}));

export type ManufacturedPackage = typeof manufacturedPackages.$inferSelect;
export type NewManufacturedPackage = typeof manufacturedPackages.$inferInsert;
