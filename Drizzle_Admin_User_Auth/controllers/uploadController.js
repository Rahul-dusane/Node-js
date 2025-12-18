// controllers/uploadController.js
import { db } from "../config/db.js";
import { productTable } from "../src/db/schema/product.js"; // make sure you have a product table
import { productSchema } from "../validator/productValidator.js"; // optional, if you want validation

export const uploadProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No product image uploaded" });
        }

        const user_id = req.user.id; // from logged-in user
        const { name, description, price } = req.body;

        if (!name || !description || !price) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        await db.insert(productTable).values({
            name,
            description,
            price: Number(price),
            image: req.file.filename,
            userId: user_id,          // <-- use correct DB column
            created_at: new Date(),
        });

        res.status(200).json({ success: true, message: "Product uploaded successfully" });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

