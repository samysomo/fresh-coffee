import Image from "next/image"


const Logo = () => {
  return (
    <div className="flex justify-center mt-5">
        <div className="relative w-40 h-40">
            <Image
                fill
                src="/logo.svg"
                alt="Logo"
            />
        </div>
    </div>
  )
}

export default Logo