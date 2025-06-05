import EditProductForm from '@/components/products/EditProductForm'
import ProductForm from '@/components/products/ProductForm'
import GoBackButton from '@/components/ui/GoBackButton'
import Heading from '@/components/ui/Heading'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

async function getProduct(id: number) {
  const res = await prisma.product.findUnique({
    where: {
      id: id
    },
  })
  return res
}

const EditProductPage = async ({params} : {params : Promise<{id: string}>}) => {
  const paramsId = await params
  const id = paramsId.id
  const product = await getProduct(+id)
  if (!product) {
    notFound()
  }
  return (
    <>
        <Heading>
            Editar producto: {product.name}
        </Heading>
        <GoBackButton
          text='Volver'
        />
        <EditProductForm>
          <ProductForm
            product={product}
          />
        </EditProductForm>
    </>
  )
}

export default EditProductPage