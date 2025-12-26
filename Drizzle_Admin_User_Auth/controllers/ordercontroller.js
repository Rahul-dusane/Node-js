import { eq ,asc } from "drizzle-orm";
import { db } from "../config/db.js";
import { orderTable } from "../src/db/schema/order.js";
import { sellerTable } from "../src/db/schema/seller.js";
import { productTable } from "../src/db/schema/product.js";
import { success } from "zod";


export const orderproduct = async (req, res) => {

    try {
        const uid = req.user.id;
        const pid = req.params.pid;

        let createdorder = await db.insert(orderTable).values({
            uid: uid,
            product_id: pid
        });

        return res.status(200).json({
            success: true,
            message: "your order is registered!",
            order: createdorder
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to place order"
        });
    }


};


export const usersorders = async (req, res) => {

    try {

        const uid = req.user.id;

        let orders = await db.select().from(orderTable).where(
            (eq(orderTable.uid, uid))
        )

        // const result = await db.select().from(orderTable)
        //     .innerJoin(
        //         productTable,
        //         eq(orderTable.product_id, productTable.id)
        //     )
        //     .where(eq(productTable.userId, uid))
        //     .orderBy(asc(orderTable.created_at));

        if(orders.length == 0){
            return res.status(400).json({
            success: false,
            message:"no orders yet"
        })
        }

        return res.status(200).json({
            success: true,
            orders: orders
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }

};

export const myorders = async (req, res) => {

    try {

        const uid = req.user.id;

        // let orders = await db.select().from(orderTable).where(
        //     (eq(orderTable.uid, uid))
        // )

        const result = await db.select().from(orderTable)
            .innerJoin(
                productTable,
                eq(orderTable.product_id, productTable.id)
            )
            .where(eq(productTable.userId, uid))
            .orderBy(asc(orderTable.created_at));

        if(result.length == 0){
            return res.status(400).json({
            success: false,
            message:"no orders yet"
        })
        }

        return res.status(200).json({
            success: true,
            result: result
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }

};