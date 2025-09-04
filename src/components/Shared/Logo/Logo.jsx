import Link from 'next/link'
import DocLogo from '../../../../public/Doctor Appointment Logo.png'
import React from 'react'
import Image from 'next/image'

export default function Logo() {
  return (
    <div>
      <Link href="/" className="block">
      <div className="flex items-center gap-0">
        {/* Logo Image */}
         <Image 
         src={DocLogo} 
        //  width={16} 
        //  height={16} 
         alt='Logo' 
         className='w-10 sm:w-12 md:w-14 lg:w-16'
         />
         
        {/* Text tightly aligned with logo */}
        <span className="ml-1 text-sm sm:text-base md:text-lg font-bold text-green-600">
          DocNow
        </span>
      </div>
    </Link>
    </div>
  )
}
