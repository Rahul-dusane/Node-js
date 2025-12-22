import express from "express";
import { userTable } from "../src/db/schema/user.js";
import { registerUser, loginUser, logoutUser, getApprovedUser } from "../controllers/userController.js";
import { isUserLoggedIn } from "../middlewares/isUserLoggedIn.js";
import { uploadProduct } from "../controllers/uploadController.js";
import { upload, userImageUpload } from "../middlewares/upload.js";
import { getMyProducts } from "../controllers/productController.js";



const router = express.Router();

router.get("/", (req, res) => {
    res.send("hey userRouter working great.");
});

// Only logged-in users can upload product
router.post("/upload", isUserLoggedIn, upload.single("image"), uploadProduct);

//user dashboard sh
router.get("/dashboard", isUserLoggedIn, getMyProducts);


// router.post("/userRegister", registerUser);

router.post("/userRegister",userImageUpload.single("profile_image"),registerUser);


router.post("/userLogin", loginUser);

router.get("/logout", logoutUser);

router.get("/approvedUser", isUserLoggedIn, getApprovedUser);

export default router;
