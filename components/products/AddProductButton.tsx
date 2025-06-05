"use client"
import { useStore } from '@/store'
import { Product } from '@prisma/client'

const AddProductButton = ({product} : {product: Product}) => {
    const addToOrder = useStore((state) => state.addToCart)
  return (
    <button 
        type="button"
        onClick={() => addToOrder(product)} 
        className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer'
    >
        Agregar
    </button>
  )
}

export default AddProductButton