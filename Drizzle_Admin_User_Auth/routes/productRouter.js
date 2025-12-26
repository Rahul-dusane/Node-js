import express from "express";
import { uploadProduct } from "../controllers/uploadController.js";
import { isUserLoggedIn } from "../middlewares/isUserLoggedIn.js";
// import { upload } from "../utils/upload.js";
import { upload } from "../middlewares/upload.js";


const router = express.Router();

router.post("/upload",isUserLoggedIn,upload.single("image"),uploadProduct);





export default router;
