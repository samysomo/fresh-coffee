import { useStore } from '@/store'
import { OrderItem } from '@/types'
import { formatCurrency } from '@/utils'
import { MinusIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'

const ProductDetails = ({item}: {item: OrderItem}) => {

    const MAX_ITEMS = 10
    const MIN_ITEMS = 1

    const increaseQuantity = useStore((state) => state.increaseQuantity)
    const decreaseQuantity = useStore((state) => state.decreaseQuantity)
    const disableDecreaseButton = useMemo(() => item.quantity === MIN_ITEMS, [item])
    const disableIncreaseButton = useMemo(() => item.quantity === MAX_ITEMS, [item])
    const removeItem = useStore((state) => state.removeItem)

  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
        <div className="space-y-4">
            <div className="flex justify-between items-start">
                <p className="text-xl font-bold">{item.name} </p>

                <button
                type="button"
                onClick={() => removeItem(item.id)}
                >
                <XCircleIcon className="text-red-600 h-8 w-8"/>
                </button>
            </div>
            <p className="text-2xl text-amber-500 font-black">
                {item.price}
            </p>
            <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
                <button
                type="button"
                onClick={() => decreaseQuantity(item.id)}
                disabled={disableDecreaseButton}
                className='disabled:opacity-20'
                >
                    <MinusIcon className="h-6 w-6"/>
                </button>

                <p className="text-lg font-black ">
                {item.quantity}
                </p>

                <button
                type="button"
                onClick={() => increaseQuantity(item.id)}
                disabled={disableIncreaseButton}
                className='disabled:opacity-20'
                >
                    <PlusIcon className="h-6 w-6"/>
                </button>
            </div>
            <p className="text-xl font-black text-gray-700">
                Subtotal: {''}
                <span className="font-normal"> 
                    {formatCurrency(item.subtotal)}
                </span>
            </p>

        </div>
    </div>
  )
}

export default ProductDetails