import { eq } from "drizzle-orm";
import {db} from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateTokens.js";
import { adminTable } from "../src/db/schema/admin.js";
import { userTable } from "../src/db/schema/user.js";
import { userVerificationTable } from "../src/db/schema/userVarification.js";
import {adminRegistrationSchema , adminLoginSchema} from "../validator/adminValidator.js";

export const registerAdmin = async function(req,res){
    try{

        const result  = adminRegistrationSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({success:false,message:result.error.flatten().fieldErrors});
        }
        let {email,password,name,role,profile_image} = result.data;
        
        let admin = await db.select().from(adminTable).where(eq(adminTable.email,email));
        if(admin.length > 0){ return res.status(409).json({success: false, message: "Email is alredy Exists ."}); }

        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt, async function(err,hash){
                if(err){
                    return res.json({success:false,message:err.message});
                }else{

                    let createdAdmin = await db.insert(adminTable).values({
                        email:email,
                        password:hash,
                        name:name,
                        role:role,
                        profile_image:profile_image
                    });

                    const getCreatedAdminRef = await db.select().from(adminTable).where(eq(adminTable.email,email));
                    const getCreatedAdmin = getCreatedAdminRef[0];
                    
                    const token = jwt.sign({id:getCreatedAdmin.id},process.env.JWT_KEY,{expiresIn:"10d"});
                    res.status(201).cookie("token",token);

                    return res.json({success:true,message:`Admin Registered .`,data:{id:getCreatedAdmin.id,email:getCreatedAdmin.email,name:getCreatedAdmin.name,role:getCreatedAdmin.role}});
                }
            });
        });
    }catch(err){
        res.status(500).json({success:false,message:`${err}`});
    }
}

export const loginAdmin = async function(req,res){
    try{
        const result  = adminLoginSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({success:false,message:result.error.flatten().fieldErrors});
        }
        let {email,password} = result.data;

        let admin = await db.select().from(adminTable).where(eq(adminTable.email,email));
        if(admin.length === 0){
            res.status(500).json({success:false,message:"Email or Password Inccorect ."});
        }

        const adminPass = admin[0];
        bcrypt.compare(password,adminPass.password,function(err,result){
            
            if(err){
                res.status(500).json({success:false,message:`${err}`});
            }

            if(result){
                let token = generateToken(adminPass);
                res.cookie("token",token);

                res.status(200).json({success:true,message:"Admin LoggedIn Successfully . ",data:{name:adminPass.name,email:adminPass.email}});
            }
        });
    }catch(err){
        res.status(500).json({success:false,message:`${err}`});
    }
}

export const logoutAdmin = async function(req,res){
    if(!req.cookies.token){
        res.status(403).json({success:false,message:"Admin Is Not LoggedIn ."});    
    }
    res.cookie("token","");
    res.status(200).json({success:true,message:"Admin Logout ."});
}

export const verifyUser = async function(req,res){
    try{
        const userId = Number(req.params.id); //this id i need to add in the postman api for manually .
        const adminId = req.admin.id;  //this id is taken from the isAdminLoggedIn middleware at there we have passed the admin like req.admin = admin; this middleware we use for the route protection .

        const verification = await db.select().from(userVerificationTable).where(eq(userVerificationTable.user_id,userId));
        if(verification.length === 0){
            res.status(404).json({ success: false, message: "Verification Request Not Found ." });    
        }
        if(verification[0].status !== "pending"){
            res.status(404).json({ success: false, message: "User Already Processed" });
        }
        
        //update userVerificationTable status and approved admin_id , verified_at 
        await db.update(userVerificationTable).set({status: "approved",admin_id:adminId,verified_at:new Date()}).where(eq(userVerificationTable.user_id,userId));

        //update userTable Is_verified property 
        await db.update(userTable).set({is_verified: 1,curresponding_admin_id:adminId}).where(eq(userTable.id,userId));

        res.status(200).json({ success: true, message: "User Verified Successfully . " });

    }catch(err){
        res.status(500).json({ success: false, message: `${err}` });
    }
}

export const getPendingUsers = async function(req,res){
    try{
        const pendingUser = await db.select().from(userTable).innerJoin(userVerificationTable,eq(userVerificationTable.id,userTable.id)).where(eq(userVerificationTable.status,"pending"));
        res.status(200).json({success:true,data:pendingUser});
    }catch(err){
        res.status(500).json({ success: false, message: `${err}` });
    }
};