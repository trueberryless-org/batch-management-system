import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { constituents } from "./constituents";
import { manufacturedRecipeHasConstituents } from "./manufacturedRecipeHasConstituents";

export const manufacturedConstituents = pgTable(
  "manufactured_constituents_bt",
  {
    id: uuid("id"),
    constituentId: uuid("id")
      .notNull()
      .references(() => constituents.id),
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
      name: "man_con_bt_pk",
      columns: [table.id],
    }),
  })
);

export const manufacturedConstituentsRelations = relations(
  manufacturedConstituents,
  ({ one, many }) => ({
    constituent: one(constituents, {
      fields: [manufacturedConstituents.constituentId],
      references: [constituents.id],
      relationName: "man_con_bt_fk_con_bt",
    }),
    manufacturedRecipeHasConstituents: many(manufacturedRecipeHasConstituents),
  })
);

export type ManufacturedConstituent =
  typeof manufacturedConstituents.$inferSelect;
export type NewManufacturedConstituent =
  typeof manufacturedConstituents.$inferInsert;
