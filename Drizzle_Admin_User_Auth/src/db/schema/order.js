import { mysqlTable, serial, bigint, varchar, timestamp } from "drizzle-orm/mysql-core";
import { userTable } from "./user.js";       
import { productTable } from "./product.js";   

export const orderTable = mysqlTable("orders", {
  oid: serial("oid").primaryKey(),

  uid: bigint("uid",  { mode: "number", unsigned: true }).notNull().references(() => userTable.id),

  product_id: bigint("product_id",  { mode: "number", unsigned: true }).notNull().references(() => productTable.id),

  status: varchar("status", { length: 20 }).default("pending").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),

  updated_at: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
