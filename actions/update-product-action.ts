"use server"

import prisma from "@/lib/prisma";
import { ProductSchema } from "@/schema";
import { revalidatePath } from "next/cache";

export async function updateProductAction(data: unknown, id: number) {
    const result = ProductSchema.safeParse(data);
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }
    await prisma.product.update({
        where: {
            id: id
        },
        data: result.data
    })
    revalidatePath("/admin/products");
}