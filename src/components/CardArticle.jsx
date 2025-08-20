import React from 'react'
import data from "../../public/data.json";
import { CaretDoubleRight } from '@phosphor-icons/react';
export default function CardArticle() {
    return (
        <>
            <div className=' relative z-20 lg:grid lg:grid-cols-3 lg:gap-12 md:gap-8 my-4'>
                {data.slice(0, 3).map((item) => (
                    <div key={item.id} className='bg-[#f9f9f9] shadow-[0_15px_50px_rgba(0,0,0,0.1)] rounded-xl px-6 py-7 flex flex-col gap-6 h-full lg:my-0 my-8'>
                        <div className='lg:w-[300px] md:w-[180px] md:h-[150px] lg:h-[200px]'>
                            <img className='w-full h-full object-cover rounded-sm ' src={item.img} alt="" />
                        </div>

                        <div className='font-poppins text-[#16294A] flex flex-col flex-1'>
                            <h4 className='font-semibold text-[18px]'>{item.title}</h4>
                            <p className='font-normal text-[14px] mb-4'>{item.content.length > 100 ? item.content.substring(0, 80) + "..." : item.content}</p>
                            <div className='flex gap-2 items-center mt-auto cursor-pointer group'>
                                <p className='mt-auto'>See Details</p>
                                <CaretDoubleRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 " />
                            </div>

                        </div>
                    </div>
                ))}

            </div>

            {/* Button More article */}
            <div className='flex justify-center my-14'>
                {data.length > 3 && (
                    <button className='bg-[#9B51E0] font-semibold font-poppins text-white py-3 px-6 rounded-full  mt-auto cursor-pointer text-[14px] w-fit '>See More</button>
                )}
            </div>
        </>


    )
}
