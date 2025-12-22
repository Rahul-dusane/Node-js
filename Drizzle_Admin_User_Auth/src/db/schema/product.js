import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
  decimal,
  bigint,
} from "drizzle-orm/mysql-core";

import { userTable } from "./user.js";   // ✅ THIS WAS MISSING

export const productTable = mysqlTable("product", {
  id: serial().primaryKey(),

  userId: bigint({ mode: "number", unsigned: true })
    .references(() => userTable.id)
    .notNull(),

  name: varchar({ length: 300 }).notNull(),
  description: varchar({ length: 500 }),

  price: decimal({ precision: 10, scale: 2 }).notNull(),
  sellingPrice: decimal({ precision: 10, scale: 2 }),

  image: varchar({ length: 500 }),

  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().onUpdateNow().notNull(),
});
