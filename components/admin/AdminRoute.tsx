"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type AdminRouteProps = {
    url: string;
    text: string;
    blank: boolean;
}

const AdminRoute = ({url, text, blank}: AdminRouteProps) => {
    const pathName = usePathname()
    const isActive = pathName.startsWith(url)

  return (
    <Link 
        className={`${isActive ? "bg-amber-400": ""} font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b`}
        href={url}
        target={blank ? '_blank' : undefined}
    >
        {text}
    </Link>
  )
}

export default AdminRoute