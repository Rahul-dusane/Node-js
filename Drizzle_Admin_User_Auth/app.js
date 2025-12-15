import dotenv from "dotenv";
import express from "express";
import { db } from "./config/db.js";
import session from "express-session";
import adminRouter from "./routes/adminRouter.js";
import userRouter from "./routes/userRouter.js"; 
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.Express_Session_Secret,
}));
app.use(express.static(path.join(__dirname,"public")));

app.use("/admin",adminRouter);
app.use("/user",userRouter);

app.get("/",function(req,res){
    res.send("hey");
});

app.listen(3000);