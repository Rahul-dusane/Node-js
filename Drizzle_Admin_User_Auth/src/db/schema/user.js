import { smallint } from "drizzle-orm/mysql-core";
import {int,mysqlTable,serial,varchar,timestamp} from "drizzle-orm/mysql-core";
import {adminTable} from "./admin.js";
import { bigint } from "drizzle-orm/mysql-core";

export const userTable = mysqlTable("users",{
    id: serial().primaryKey(),
   
    email: varchar({length: 255}).unique().notNull(),
    name: varchar({length: 255}).notNull(),
    password: varchar({length: 100}).notNull(),
   
    profile_image: varchar({length:500}).default(null),

    is_verified: smallint().default(0).notNull(),               //  is_verified 1 = verified , 0 = not verified .
    is_blocked: smallint().default(0).notNull(),                    //  is_blocked 1 = blocked , 0 = not blocked .
   
    curresponding_admin_id: bigint({mode: "number" , unsigned:true}).references( () => adminTable.id ),  //foreign key taken from the adminTable , as a reference . 
   
    created_at: timestamp().defaultNow().notNull(),                // auto set when record is created
    updated_at: timestamp().defaultNow().onUpdateNow().notNull(),  // auto change when each time record is updated
});