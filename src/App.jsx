import React, { useState, useEffect } from 'react'
import { CiMenuFries } from 'react-icons/ci';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import Bg1 from './assets/gradasibg.png';
import Home from './Pages/Home';
import { Routes, Route } from 'react-router-dom';
import Article from './Pages/Article';
import Footer from './components/Footer';
import Budget from './components/Budget/Budget.jsx';

export default function App() {
  // const messages = ["Selamat Datang", "Di", "Finanku Web"];
  // const [index, setIndex] = useState(0);
  // const [loading, setLoading] = useState(true);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  });




  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const content = <>
    <div className='lg:hidden absolute top-16 w-screen h-screen left-0 right-0 bg-white cursor-pointer  flex flex-col items-center justify-center transform transition-all duration-500 ease-in-out'>
      <ul className='text-center text-[#16294A] font-outfit  font-medium text-2xl transition hover:border-[#67C9CB] cursor-pointer'>
        <Link spy={true} to="home" smooth={true} duration={1000}><li className=' my-4 py-4 hover:rounded'>Home</li></Link>
        <Link spy={true} to="home" smooth={true} duration={1000}><li className=' my-4 py-4 hover:rounded'>Why Us</li></Link>
        <Link spy={true} to="/article" smooth={true} duration={1000}><li className=' my-4 py-4 hover:rounded'>Article</li></Link>
        <Link spy={true} to="home" smooth={true} duration={1000}><li className=' my-4 py-4 hover:rounded'>Get Started</li></Link>
      </ul>
    </div>
  </>

  // untuk splashScreen
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % messages.length);
  //   }, 1000); // ganti teks tiap 1 detik

  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //     clearInterval(interval);
  //   }, messages.length * 1000); // durasi total sama dengan jumlah teks

  //   return () => {
  //     clearInterval(interval);
  //     clearTimeout(timer);
  //   };
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-[#9B51E0]">
  //       <h1 className="text-white text-3xl font-bold transition-opacity duration-500 font-poppins">
  //         {messages[index]}
  //       </h1>
  //     </div>
  //   );
  // }

  return (
    <div className=''>
      <nav className={`z-30 fixed top-0 left-0 right-0 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
        <div className='flex justify-between z-50 text-white lg:py-3 lg:px-20 px-10 py-4'>
          <div className='flex items-center flex-1'>
            <p className='text-2xl font-bold font-outfit text-[#9B51E0]'>Finan<span className=' text-[#16294A]'>Ku</span></p>
          </div>

          <div className='lg:flex md:flex lg:flex-1 items-center font-normal'>
            <div className='flex-10'>
              <ul className='hidden lg:flex gap-8 mr-16 text-[16px] font-outfit items-center w-full justify-end'>
                <Link spy={true} to="/" smooth={true} duration={1000}><li className='text-[#16294A] font-medium text-base transition hover:border-[#67C9CB] cursor-pointer'>Home</li></Link>
                <Link spy={true} to="home" smooth={true} duration={1000}><li className='text-[#16294A] font-medium text-base transition hover:border-[#67C9CB] cursor-pointer'>Why Us</li></Link>
                <Link spy={true} to="/article" smooth={true} duration={1000}><li className='text-[#16294A] font-medium text-base transition hover:border-[#67C9CB] cursor-pointer'>Article</li></Link>
                <Link spy={true} to="/budget" smooth={true} duration={1000}>
                  <li >
                    <button className='btn liquid bg-transparent font-medium text-base border-1 py-3 border-[#9B51E0] text-[#9B51E0] px-6 rounded-full tracking-wide cursor-pointer'>Get Started</button>
                  </li>
                </Link>
              </ul>
            </div>
          </div>

          <div>
            {click && content}
          </div>

          {/* button untuk mobile */}
          <button className='block sm:hidden transition cursor-pointer' onClick={handleClick}>
            {click ? <FaTimes className='text-black' /> : <CiMenuFries className='text-black' />}
          </button>
        </div>
      </nav>

      <img className=' absolute top-0 w-[1000px]' src={Bg1} alt="Money" />

      {/* Ganti-ganti Page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Article />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>

      {/* Footer */}

      <Footer/>


    </div>
  )
}
