"use client"

import { useStore } from "@/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/schema"
import { toast } from "react-toastify"

const OrderSummary = () => {
  const order = useStore((state) => state.order)
  const clearOrder = useStore((state => state.clearOrder))
  const total = useMemo(() => order.reduce((total, item) => total + item.subtotal, 0), [order])

  const handleCreateOrder = async (formData : FormData) => {
    const data = {
      name : formData.get("name"),
      total,
      order
    }

    const result = OrderSchema.safeParse(data)
    
    if(!result.success){
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }

    const response = await createOrder(data)
    if(response?.errors){
      response.errors.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }
    toast.success("Pedido realizado correctamente")
    clearOrder()
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
        <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
        {order.length === 0
          ? <p className="text-center my-10">El pedido está vacío</p>
          : <div className="mt-5">
              {order.map((item) => (
                <ProductDetails 
                  key={item.id}
                  item={item}
                />
              ))}

              <p className="text-2xl mt-20 text-center">
                Total a pagar: {""}
                <span className="font-bold">{formatCurrency(total)}</span>
              </p>
              
              <form 
                className="w-full mt-10 space-y-5"
                action={handleCreateOrder}
              >
                <input
                  type="text"
                  placeholder="Tu Nombre"
                  className="bg-white border border-gray-100 p-2 w-full"
                  name="name"
                />
                  <input 
                      type="submit"
                      className='py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold'
                      value="Confirmar pedido"
                  />
              </form>
            </div>
          
        }
    </aside>
  )
}

export default OrderSummary