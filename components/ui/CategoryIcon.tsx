"use client"
import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

type CategoryIconProps = {
    category: Category
}

const CategoryIcon = ({category} : CategoryIconProps) => {
    const params = useParams()
  return (
    <div className={`${params.category == category.slug && "bg-amber-400" } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}>
        <div className='relative h-16 w-16'>
            <Image
                fill 
                src={`/icon_${category.slug}.svg`}
                alt='Categoria'
            />
        </div>
        <Link
            href={`/order/${category.slug}`} 
            className='text-xl font-bold'
        >
            {category.name}
        </Link>
    </div>
  )
}

export default CategoryIcon