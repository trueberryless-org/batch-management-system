import { relations } from "drizzle-orm";
import {
  AnyPgColumn,
  foreignKey,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { goods } from "./goods";
import { recipes } from "./recipes";

export const doughs = pgTable(
  "doughs",
  {
    id: uuid("id"),
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
      name: "dou_pk",
      columns: [table.id],
    }),
    fkGooBt: foreignKey({
      name: "fk_dou_goo_bt",
      columns: [table.id],
      foreignColumns: [goods.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  })
);

export const doughsRelations = relations(doughs, ({ one }) => ({
  good: one(goods, {
    fields: [doughs.id],
    references: [goods.id],
    relationName: "dou_fk_goo_bt",
  }),
}));

export type Dough = typeof doughs.$inferSelect;
export type NewDough = typeof doughs.$inferInsert;
