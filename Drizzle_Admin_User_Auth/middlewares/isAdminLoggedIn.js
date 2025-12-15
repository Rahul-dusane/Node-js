import dotenv from "dotenv";
dotenv.config();
import jwt, { decode } from "jsonwebtoken";
import { adminTable } from "../src/db/schema/admin.js";
import { db } from "../config/db.js";
import { eq } from "drizzle-orm";


export const isAdminLoggedIn = async function(req,res,next){
    if(!req.cookies.token){
        return res.status(401).json({success:false,message:"You Need To Logged In First ."});
    }
    try{
        let decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
        
        let loggedInAdmin = await db.select().from(adminTable).where(eq(adminTable.id,decoded.id));
        if(loggedInAdmin.length === 0){
            return res.status(401).json({success:false,message:"Admin Not Found ."});    
        }
        const admin = loggedInAdmin[0];

        if(admin.is_active === 0){
            res.status(403).json({success:false,message:"Admin Account Is Deactivated ."});            
        }

        req.admin = admin;
        next();
    }catch(err){
        res.status(500).json({success:false,message:`${err}`});
    }
};