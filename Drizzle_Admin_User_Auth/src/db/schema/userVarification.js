import { smallint } from "drizzle-orm/mysql-core";
import {int,mysqlTable,serial,varchar,timestamp} from "drizzle-orm/mysql-core";
import {adminTable} from "./admin.js";
import {userTable} from "./user.js";
import { bigint } from "drizzle-orm/mysql-core";

export const userVerificationTable = mysqlTable("user_verifications",{
    id: serial().primaryKey(),
    
    user_id: bigint({mode: "number" , unsigned:true}).references( () => userTable.id ).notNull(),
    admin_id: bigint({mode: "number" , unsigned:true}).references( () => adminTable.id ),

    status: varchar({length: 20}).default("pending").notNull(),
    verified_at: timestamp(), 

    created_at: timestamp().defaultNow().notNull(),
});