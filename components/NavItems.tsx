'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
const navitems = [
    {label:'Home', href:'/'},
    {label:'Companions', href:'/companions'},
    {label:'My Journey', href:'/my-journey'},

]

const NavItems = () => {
    const pathname = usePathname();
  return (
    <nav className='flex items-center gap-4'>
        {navitems.map(({label, href})=>(
            <Link href={href} key={label} className={cn(pathname === href && 'text-orange-500 font-semibold')} >
                {label}
            </Link>
        ))}
    </nav>
  )
}

export default NavItems