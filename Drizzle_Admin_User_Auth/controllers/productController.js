import { db } from "../config/db.js";
import { productTable } from "../src/db/schema/product.js"; // make sure you have a product table
import { eq } from "drizzle-orm";

export const getMyProducts = async (req, res) => {
    try {
        const userId = req.user.id; // logged-in user id

        const products = await db
            .select()
            .from(productTable)
            .where(eq(productTable.userId, userId));

        res.status(200).json({
            success: true,
            products,
        });

    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};