import { eq } from "drizzle-orm";
import {db} from "./config/db.js";
import { userTable } from "./drizzle/schema.js";


const main = async() => {
    // const insertUser = await db.insert(userTable).values({
    //     name:"xyz",
    //     age:"31",
    //     email:"xyz@gmail.com"
    // });

    // const insertUser = await db.insert(userTable).values([
        
    //     {
    //         name:"MNO",
    //         age:"26",
    //         email:"MNO@gmail.com",
    //     },
        
    //     {
    //         name:"ABC",
    //         age:"23",
    //         email:"ABC@gmail.com",
    //     },
    // ]);

    // const displayUser = await db.select().from(userTable).where({email:"xyz@gmail.com"});
    
    // const updateUser = await db.update(userTable).set({name:"xyz"}).where(eq(userTable.email,"xyz@gmail.com"));
    
    const deleteUser = await db.delete(userTable).where(eq(userTable.email,"xyz@gmail.com"));

    console.log(deleteUser);
};

main().catch((error) => {
    console.log(error);
});