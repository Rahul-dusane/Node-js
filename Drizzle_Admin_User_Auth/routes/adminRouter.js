import express from "express";
const router = express.Router();
import { adminTable } from "../src/db/schema/admin.js";
import { db } from "../config/db.js";
import { registerAdmin , logoutAdmin , loginAdmin , getPendingUsers , verifyUser } from "../controllers/adminController.js";
import { isAdminLoggedIn } from "../middlewares/isAdminLoggedIn.js";
router.get("/",function(req,res){
    res.send("hey adminRouter working grate . ");
});

router.post("/adminRegister",registerAdmin);

router.post("/adminLogin",loginAdmin);

router.get("/logout",logoutAdmin);

router.get("/pendingUsers",isAdminLoggedIn,getPendingUsers);

router.post("/users/:id/verify",isAdminLoggedIn,verifyUser);

export default router;

