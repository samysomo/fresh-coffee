import { formatCurrency, getImagePath } from '@/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'
import AddProductButton from './AddProductButton'

const ProductCard = ({product} : {product : Product}) => {
    const imagePath = getImagePath(product.image);
  return (
    <div className='bg-white border'>

        <Image
            src={imagePath}
            alt={`Imagen ${product.name}`}
            width={400}
            height={500}
        />
        <div className='p-5'>
            <h3 className='text-2xl font-bold'>{product.name}</h3>
            <p className='mt-5 font-black text-4xl text-amber-500'>
                {formatCurrency(product.price)}
            </p>
            <AddProductButton
                product={product}
            />
        </div>
    </div>
  )
}

export default ProductCard