import { FacebookLogoIcon, InstagramLogo, GithubLogo, CaretCircleRightIcon, CaretCircleDoubleRightIcon } from '@phosphor-icons/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='bg-[#9B51E0] mt-20'>
      <div className='lg:px-20 px-10 grid lg:grid-cols-4  lg:py-16 py-10 gap-8'>
        <p className='text-2xl font-bold font-outfit text-white'>Finan<span className=' text-[#16294A]'>Ku</span></p>
        <ul className='font-poppins font-medium text-[16px] flex flex-col lg:gap-8 gap-0'>
          <Link to="/"><li className='text-gray-100 hover:text-white cursor-pointer '>Home</li></Link>
          <Link to="/article"><li className='text-gray-100 hover:text-white cursor-pointer '>Article</li></Link>
          <Link to="/budget"><li className='text-gray-100 hover:text-white cursor-pointer '>Get Started</li></Link>
        </ul>

        <div className='flex flex-col gap-2'>
          <h4 className='font-poppins font-medium text-[16px] text-white'>Media</h4>
          <div className='flex gap-3'>
            <FacebookLogoIcon className='text-white cursor-pointer' logo size={32} />
            <InstagramLogo className='text-white cursor-pointer' size={32} />
            <GithubLogo className='text-white cursor-pointer' size={32} />
          </div>
        </div>

        <div className=' text-white flex flex-col gap-4'>
          <p>Update finansial dan tips cerdas hanya di Finanku – jangan sampai ketinggalan!</p>
          <div className='flex justify-between'>
            <input className=' border-none focus:outline-none focus:ring-0' type="email" placeholder='Email' />
            <CaretCircleRightIcon size={32} weight="fill" />
          </div>
          <hr />

        </div>

      </div>

      <hr className='border-gray-200 ' />


      <p className='text-center font-poppins font-medium lg:text-[16px] text-white py-6 px-8 lg:px-0 text-base'>©️ 2025 Finanku. All Rights Reserved. Create by <span>Nisaa</span></p>
    </div>
  )
}
