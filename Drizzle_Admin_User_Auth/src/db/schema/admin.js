import { smallint } from "drizzle-orm/mysql-core";
import {mysqlTable,serial,varchar,timestamp} from "drizzle-orm/mysql-core";

export const adminTable = mysqlTable("admins",{
    id: serial().primaryKey(),
    
    email: varchar({length: 255}).unique().notNull(),
    name: varchar({length: 255}).notNull(),
    password: varchar({length: 100}).notNull(),

    profile_image: varchar({length:500}).default(null),

    role: varchar({length: 50}).default("admin").notNull(),
    is_active: smallint().default(1).notNull(),                    //  is_active 1 = active , 0 = deactive .
    
    created_at: timestamp().defaultNow().notNull(),                // auto set when record is created
    updated_at: timestamp().defaultNow().onUpdateNow().notNull(),  // auto change when each time record is updated
});