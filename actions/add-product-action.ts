"use server"

import prisma from "@/lib/prisma";
import { ProductSchema } from "@/schema"

export async function addProductAction(formData: unknown) {
    const result = ProductSchema.safeParse(formData);
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }
    await prisma.product.create({
        data: result.data
    })
}