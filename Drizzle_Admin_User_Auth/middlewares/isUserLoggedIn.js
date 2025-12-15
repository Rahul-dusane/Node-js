import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { userTable } from "../src/db/schema/user.js";
import { db } from "../config/db.js";
import { eq } from "drizzle-orm";

export const isUserLoggedIn = async function(req,res,next){
    if(!req.cookies.token){
        return res.status(401).json({success:false,message:"You Need To Logged In First ."});
    }  
    
    try{
        let decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
        
        let loggedInUser = await db.select().from(userTable).where(eq(userTable.id,decoded.id));
        if(loggedInUser.length === 0){
            return res.status(401).json({success:false,message:"Admin Not Found ."});    
        }
        const user = loggedInUser[0];

        if(user.is_verified === 0){
          res.status(403).json({success:false,message:"user Account Is Not Approved ."});  
        }

        req.user = user;
        next();

    }catch(err){
        res.status(500).json({success:false,message:`${err}`});
    }
    
}