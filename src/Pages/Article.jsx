import React from 'react'
import CardArticle from '../components/CardArticle';
import { Link } from 'react-router-dom';
import Bg5 from '../assets/bg5.png';
export default function Article() {
  return (
    <div className=' pt-28'>
      <div className='lg:px-20 px-10'>

        <div div className='relative' >
          {/* <img className='absolute z-10 -top-20 left-0 -mx-10 lg:-mx-20' src={Bg5} alt="Background 5" /> */}
          <h3 className='font-outfit text-center font-bold text-[32px] text-[#9B51E0]'>Finansial Literation</h3>
          <div>
            <div>
              <CardArticle />
            </div>
          </div>
        </div >
      </div>
    </div>
  )
}
