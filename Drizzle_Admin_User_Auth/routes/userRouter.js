import express from "express";
import { userTable } from "../src/db/schema/user.js";
import { registerUser, loginUser, logoutUser, getApprovedUser } from "../controllers/userController.js";
import { isUserLoggedIn } from "../middlewares/isUserLoggedIn.js";
import { uploadProduct } from "../controllers/uploadController.js";
import { upload, userImageUpload } from "../middlewares/upload.js";
import { getMyProducts, productlist } from "../controllers/productController.js";
import { orderproduct } from "../controllers/ordercontroller.js";
import { isseller } from "../middlewares/isseller.js"
import { myorders, usersorders } from "../controllers/ordercontroller.js";



const router = express.Router();

router.get("/", (req, res) => {
    res.send("hey userRouter working great.");
});

// Only logged-in users can upload product
router.post("/upload", isUserLoggedIn, upload.single("image"), uploadProduct);

//user dashboard sh
router.get("/dashboard", isUserLoggedIn, getMyProducts);


//list of the peoducts
router.get("/products",isUserLoggedIn,productlist)

//👀 user can see their order data
router.get("/userorder",isUserLoggedIn,usersorders);


// 🛒 user order the product
router.post("/order/:pid",isUserLoggedIn,orderproduct);

//👀 user(only seller) can see the order data
router.get("/myorder",isUserLoggedIn,isseller,myorders);





router.post("/userRegister",userImageUpload.single("profile_image"),registerUser);

router.post("/userLogin", loginUser);

router.get("/logout", logoutUser);

router.get("/approvedUser", isUserLoggedIn, getApprovedUser);

export default router;
