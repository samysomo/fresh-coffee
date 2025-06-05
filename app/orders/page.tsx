"use client"
import LatestOrderItem from '@/components/order/LatestOrderItem'
import Logo from '@/components/ui/Logo'
import { OrderWithProducts } from '@/types'
import useSWR from 'swr'

const OrdersPage = () => {
    const url = "/admin/orders/api"
    const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data)
    const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 60000,
        revalidateOnFocus: false,
    })

    if(isLoading) return <p className='text-center mt-10'>Cargando...</p>

  if (data) return (
    <>
        <h1 className='text-center mt-20 text-6xl font-black'>Ordenes listas</h1>
        <Logo/>
        {data.length ? (
          <div className='grid grid-cols-1 gap-5 mt-10 max-w-5xl mx-auto'>
            {data.map(order => (
              <LatestOrderItem order={order} key={order.id}/>
            ))}
          </div>
        ): (
          <p className='text-center text-gray-600 mt-10'>No hay ordenes pendientes</p>
        )}
    </>
  )
}

export default OrdersPage