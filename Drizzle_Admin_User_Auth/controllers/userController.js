import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateTokens.js";
import { userTable } from "../src/db/schema/user.js";
import { userVerificationTable } from "../src/db/schema/userVarification.js";
import { userRegistrationSchema, userLoginSchema } from "../validator/userValidator.js";

export const registerUser = async function (req, res) {
    try {
        const result = userRegistrationSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ success: false, message: result.error.flatten().fieldErrors });
        }
        let { email, password, name, profile_image } = result.data;

        let user = await db.select().from(userTable).where(eq(userTable.email, email));
        if (user.length > 0) {
            return res.status(409).json({ success: false, message: "Email is alredy Exists ." });
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    return res.status(500).json({ success: false, message: err.message });
                } else {
                    let createdUser = await db.insert(userTable).values({
                        email: email,
                        name: name,
                        password: hash,
                        profile_image: profile_image
                    });

                    const getCreatedUserRef = await db.select().from(userTable).where(eq(userTable.email, email));
                    const getCreatedUser = getCreatedUserRef[0];

                    const createdUserId = getCreatedUser.id;

                    await db.insert(userVerificationTable).values({
                        user_id: createdUserId,
                    });

                    const token = jwt.sign({ id: getCreatedUser.id }, process.env.JWT_KEY, { expiresIn: "10d" });
                    res.cookie("token", token);

                    return res.status(200).json({ success: true, message: `User Registration Request Submited .`, data: { id: getCreatedUser.id, email: getCreatedUser.email, name: getCreatedUser.name, status: "pending", } });
                }
            });
        });
    } catch (err) {
        res.status(500).json({ success: false, message: `${err}` });
    }
}

export const loginUser = async function (req, res) {
    try {
        const result = userLoginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ success: false, message: result.error.flatten().fieldErrors });
        }
        const { email, password } = result.data;

        let user = await db.select().from(userTable).where(eq(userTable.email, email));
        if (user.length === 0) {
            res.status(500).json({ success: false, message: "Email or Password Inccorect ." });
        }

        const userPass = user[0];
        bcrypt.compare(password, userPass.password, function (err, result) {

            if (err) {
                res.status(500).json({ success: false, message: `${err}` });
            }

            if (result) {
                let token = generateToken(userPass);
                res.cookie("token", token);

                res.status(200).json({ success: true, message: "User LoggedIn Successfully . ", data: { name: userPass.name, email: userPass.email } });
            }
        });
    } catch (err) {
        res.status(500).json({success:false,message:`${err}`});
    }
}

export const logoutUser = async function(req,res){
    if(!req.cookies.token){
        res.status(403).json({success:false,message:"User Is Not LoggedIn ."});    
    }
    
    res.cookie("token","");
    res.status(200).json({success:true,message:"User Logout ."});
}

export const getApprovedUser = async function(req,res){
    try{
        const approvedUser = await db.select().from(userTable).where(eq(userTable.is_verified,1));
        res.status(200).json({success:true,data:approvedUser});
    }catch(err){
        res.status(500).json({ success: false, message: `${err}` });
    }
}