import ProductSearchForm from '@/components/products/ProductSearchForm'
import ProductsTable from '@/components/products/ProductsTable'
import Heading from '@/components/ui/Heading'
import prisma from '@/lib/prisma'

const searchProducts = async (search: string) => {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: search,
                mode: 'insensitive'
            }
        }, include: {
            category: true
        },
    })
    return products
}

const SearchPage = async ({searchParams} : {searchParams: {search: string}}) => {
    const params = await searchParams
    const search = params.search || ''
    const products = await searchProducts(search)
  return (
    <>
        <Heading>
            Resultados de la Búsqueda: {search}
        </Heading>
        <div className='flex flex-col lg:flex-row lg:justify-end items-center gap-5'>
          <ProductSearchForm/>
        </div>
        {products.length === 0 ? (
            <p className='text-center text-gray-500 mt-10'>No se encontraron productos para &ldquo;{search}&rdquo;</p>
        ): (
            <ProductsTable products={products} />
        )}
        
    </>
  )
}

export default SearchPage