"use client"
import { useRouter } from 'next/navigation'

const GoBackButton = ({text} : {text: string}) => {
    const router = useRouter()
  return (
    <button onClick={() => router.back()} className="bg-amber-400 px-10 py-3 w-full lg:w-auto text-xl text-center font-bold cursor-pointer">
        {text}
    </button>
  )
}

export default GoBackButton