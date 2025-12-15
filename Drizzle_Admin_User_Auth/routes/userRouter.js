import express from "express";
import {userTable} from "../src/db/schema/user.js";
import {registerUser,loginUser,logoutUser , getApprovedUser} from "../controllers/userController.js";
import {isUserLoggedIn} from "../middlewares/isUserLoggedIn.js";
import {db} from "../config/db.js";
const router = express.Router();

router.get("/",function(req,res){
    res.send("hey userRouter working grate . ");
});

router.post("/userRegister",registerUser);

router.post("/userLogin",loginUser);

router.get("/logout",logoutUser);

router.get("/approvedUser",isUserLoggedIn,getApprovedUser);

export default router;

