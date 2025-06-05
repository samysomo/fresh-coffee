"use client"
import OrderCard from '@/components/order/OrderCard'
import Heading from '@/components/ui/Heading'
import { OrderWithProducts } from '@/types'
import useSWR from 'swr'

const OrdersPage =  () => {
  const url = "/admin/orders/api"
  const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data)
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  })

  if (error) return <p className='text-red-500 text-center mt-10'>Error al cargar las ordenes</p>
  if (isLoading) return <p className='text-center mt-10'>Cargando...</p>
  if(data) return (
    <>
        <Heading>
            Administrar Ordenes
        </Heading>
        {data.length ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
            {data.map(order => (
              <OrderCard
                key={order.id}
                order={order}
              />
            ))}
          </div>
        ): (
          <p className='text-center text-gray-600 mt-10'>No hay ordenes pendientes</p>
        )}
    </>
  )
}

export default OrdersPage