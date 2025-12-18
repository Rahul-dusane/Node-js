// import { smallint } from "drizzle-orm/mysql-core";
// import {int,mysqlTable,serial,varchar,timestamp,decimal} from "drizzle-orm/mysql-core";
// import { bigint } from "drizzle-orm/mysql-core";


// export const productTable = mysqlTable("product", {
//     id: serial().primaryKey(),

//     userid: bigint({ mode: "number", unsigned: true })
//         .references(() => userTable.id)
//         .notNull(),

//     name: varchar({ length: 300 }).notNull(),
//     description: varchar({ length: 500 }),

//     price: decimal("price", { precision: 10, scale: 2 }).notNull(),
//     sellingPrice: decimal("selling_price", { precision: 10, scale: 2 }),

//     image: varchar({ length: 500 }),

//     created_at: timestamp().defaultNow().notNull(),
//     updated_at: timestamp().defaultNow().onUpdateNow().notNull(),
// });


// // bigint({mode: "number" , unsigned:true}).references( () => adminTable.id ),  //foreign key taken from the adminTable , as a reference . 

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
