import { mysqlTable, serial, bigint, timestamp } from "drizzle-orm/mysql-core";
import { userTable } from "./user.js";        
import { unique } from "drizzle-orm/gel-core";

export const sellerTable = mysqlTable("seller", {

    sid: serial("sid").primaryKey(),

    uid: bigint("uid", { unsigned: true }).notNull().references(() => userTable.id).unique(),

    created_at: timestamp("created_at").defaultNow().notNull(),
});


