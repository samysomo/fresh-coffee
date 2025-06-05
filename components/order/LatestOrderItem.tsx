import { OrderWithProducts } from '@/types'

const LatestOrderItem = ({order}: {order : OrderWithProducts}) => {
  return (
    <div className='bg-white p-5 rounded-lg space-y-5 shadow'>
        <p className='text-2xl font-bold text-slate-600'>Cliente: {order.name}</p>
        <ul className='divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500' role='list'>
            {order.orderproducts.map(product => (
                <li key={product.id} className='py-6 flex text-lg'>
                    <p>
                        <span className='font-bold'>
                            ({product.quantity}) {""}
                        </span>
                        {product.product.name}
                    </p>
                </li>
            ))}    
        </ul>
    </div>
  )
}

export default LatestOrderItem