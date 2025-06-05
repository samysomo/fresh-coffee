"use server"

import prisma from "@/lib/prisma"

export async function productCount() {
    return await prisma.product.count()
}