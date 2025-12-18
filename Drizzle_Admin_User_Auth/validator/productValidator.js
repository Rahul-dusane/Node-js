import { z } from "zod";

export const productSchema = z.object({
    userid: z.number().positive(),

    name: z.string().min(2, "Product name required"),
    description: z.string().optional(),

    price: z.number().positive("Price must be positive"),
    sellingPrice: z.number().positive().optional(),

    image: z.string().optional(),
});