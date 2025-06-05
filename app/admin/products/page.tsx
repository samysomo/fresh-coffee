import { productCount } from '@/actions/count-products-action'
import { getProducts } from '@/actions/get-products-action'
import ProductSearchForm from '@/components/products/ProductSearchForm'
import ProductsPagination from '@/components/products/ProductsPagination'
import ProductsTable from '@/components/products/ProductsTable'
import Heading from '@/components/ui/Heading'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'



const ProductsPage = async ({searchParams} : {searchParams : Promise<{page: string}>}) => {
  const params = await searchParams
  const page = +params.page || 1
  const pageSize = 10

  if (page < 0) redirect("/admin/products")

  const productsData = getProducts(page, pageSize)
  const totalProductsData = productCount()

  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  const totalPages = Math.ceil(totalProducts / pageSize)

  if(page > totalPages){
    redirect("/admin/products")
  }
  return (
    <>
        <Heading>
            Administrar Productos
        </Heading>
        <div className='flex flex-col lg:flex-row lg:justify-between items-center gap-5'>
          <Link href="/admin/products/new" className="bg-amber-400 px-10 py-3 w-full lg:w-auto text-xl text-center font-bold cursor-pointer">
            Agregar Producto
          </Link>
          <ProductSearchForm/>
        </div>
        <ProductsTable  products={products}/>
        <ProductsPagination page={page} totalPages={totalPages}/>
    </>
  )
}

export default ProductsPage