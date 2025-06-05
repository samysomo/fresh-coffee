import prisma from "@/lib/prisma"

export async function GET(){
    const orders = await prisma.order.findMany({
    where: {
      status: false
    },
    include: {
      orderproducts: {
        include: {
          product: true
        }
      }
    }
  })
  return Response.json(orders)
}