import { FacebookLogoIcon, InstagramLogo, GithubLogo } from '@phosphor-icons/react'
import React from 'react'

export default function Footer() {
  return (
    <div className='bg-[#9B51E0]'>
      <div className='lg:px-20 px-10 lg:grid lg:grid-cols-3 gap-10 py-16'>
        <p className='text-2xl font-bold font-outfit text-white'>Finan<span className=' text-[#16294A]'>Ku</span></p>
        <ul className='font-poppins font-medium text-[16px] flex flex-col gap-8'>
          <li className='text-gray-100 hover:text-white cursor-pointer '>Home</li>
          <li className='text-gray-100 hover:text-white cursor-pointer '>Why Us</li>
          <li className='text-gray-100 hover:text-white cursor-pointer '>Article</li>
        </ul>

        <div className='flex flex-col gap-2'>
          <h4 className='font-poppins font-medium text-[16px] text-white'>Media</h4>
          <div className='flex gap-3'>
            <FacebookLogoIcon className='text-white cursor-pointer' logo size={32} />
            <InstagramLogo className='text-white cursor-pointer' size={32} />
            <GithubLogo className='text-white cursor-pointer' size={32} />
          </div>
        </div>
      </div>

      <hr className='border-gray-200 ' />
      <p className='text-center font-poppins font-medium text-[14px] text-white py-6'>©️ 2025 Finanku. All Rights Reserved. Create by <span>Nisaa</span></p>
    </div>
  )
}
