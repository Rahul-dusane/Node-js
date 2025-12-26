import dotenv from "dotenv";
dotenv.config();
import { db } from "../config/db.js";
import { eq } from "drizzle-orm";
import { sellerTable } from "../src/db/schema/seller.js";
import { success } from "zod";

export const isseller = async function (req, res, next) {

    try {

        let uid = req.user.id;

        let sellerexist = await db.select().from(sellerTable).where(
            (eq(sellerTable.uid, uid))
        )

        if (sellerexist.length === 0) {
           return res.status(430).json({
            success: false,
            message:"only seller are allowed"
           })
        }

        next();
        



    } catch (err) {
        res.status(500).json({ success: false, message: `${err}` });
    }

}