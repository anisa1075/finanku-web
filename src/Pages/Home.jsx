import React, { useEffect } from 'react'
import Hero from '../assets/hero.png';
import Bg2 from '../assets/bg2.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Bg3 from '../assets/bg3.png';
import Dompet from '../assets/dompet.png';
import Icon1 from '../assets/icon1.jpg';
import Icon2 from '../assets/icon2.png';
import Icon3 from '../assets/icon3.png';
import Bg4 from '../assets/bg4.png';
import Bg5 from '../assets/bg5.png';
import CardArticle from '../components/CardArticle';
import Bg6 from '../assets/bg6.png';
import Donasi from '../assets/donasi.png';
import CardTestimoni from '../components/CardTestimoni';
import Footer from '../components/Footer';



export default function Home() {


    useEffect(() => {
        AOS.init({
            once: true,
            duration: 1000
        });
    }, []);


    return (
        <>
            {/* section 1 */}
            <div className='lg:px-20 px-10'>
                <div className='bg-[##fdfdfd] rounded-4xl shadow-[0_15px_50px_rgba(0,0,0,0.1)] py-20 px-20 my-4 mt-28'>
                    <div className='relative z-20 grid grid-cols-2 gap-10 '>
                        <div data-aos="fade-right" className=' font-poppins'>
                            <p className=' font-medium text-[20px] text-[#16294A] opacity-40'>Save Our Money</p>
                            <h1 className=' font-semibold text-[40px] text-[#16294A] leading-12 mt-4'>Financial <br /> Literasi</h1>
                            <p className=' font-medium text-[18px] text-[#16294A] opacity-40  mt-4'>Kelola Budget & Pengeluaran Lebih Mudah. Atur pemasukan, pantau pengeluaran, dan capai tujuan finansialmu dengan satu aplikasi.</p>
                            <button className=' bg-[#9B51E0] font-semibold text-white py-3 px-6 rounded-full  mt-6 tracking-wide cursor-pointer'>Get Started</button>

                        </div>

                        <div data-aos="fade-left" className='flex items-center justify-center w-full'>
                            <img src={Hero} alt="" className='w-[400px]' />
                        </div>
                    </div>

                    <img className='absolute top-50' src={Bg2} alt="" />
                </div >
            </div>

            {/* section 2 */}
            <div className='lg:px-20 px-10'>
                <div div className='relative my-24' >
                    <h1 className='font-poppins text-[28px] text-[#9B51E0] font-bold text-center'>Pengeluaran terkontrol dan masa depan pun terjaga</h1>

                    <div className=''>
                        <img data-aos="zoom-in-right" className='absolute top-20 left-0 -mx-10 lg:-mx-20 z-10' src={Bg3} alt="" />
                        <div className='relative z-20 grid grid-cols-2 items-center'>
                            <img data-aos="zoom-in-right" className='relative z-20 w-[400px] mt-30' src={Dompet} alt="Dompet" />

                            <div data-aos="zoom-in-left" className='h-fit bg-[#fdfdfd] rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.1)] py-10 px-10 relative z-20 font-poppins top-12 right-0 -left-10'>
                                <h3 className='font-bold text-[20px]'>Kenapa Harus Coba Aplikasi Ini?</h3>
                                <div className='flex flex-col gap-4 leading-5'>
                                    <p className='font-normal text-[14px] mt-4'>Karena mengatur keuangan bukan cuma soal angka, tapi soal hidup yang lebih tenang.</p>
                                    <div className='font-regular text-[14px]'>
                                        Dengan aplikasi ini, kamu bisa:
                                        <br />
                                        <ol>
                                            <li>1. Mengontrol pengeluaran agar tidak boros.</li>
                                            <li>2. Mencapai tujuan finansial seperti dana darurat, liburan, atau investasi.</li>
                                            <li>3. Mengurangi stres keuangan dengan perencanaan yang rapi.</li>
                                            <li>4. Membangun masa depan aman untuk diri sendiri dan keluarga.</li>
                                        </ol>
                                        <p className='mt-4'>Mulailah sekarang, biar uang yang kamu hasilkan benar-benar bekerja untuk masa depanmu.</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3 */}
            <div className='lg:px-20 px-10'>
                <div div className='relative' >
                    <div className='text-center font-outfit'>
                        <h4 className='text-[#ACCCCC] font-bold text-[16px]'>WHY SERVICE NAME</h4>
                        <h3 className='font-bold text-[32px] text-[#9B51E0]'>Finance management solutions</h3>
                    </div>

                    <div className='grid grid-cols-3 gap-20 my-16 mx-14'>
                        {/* card 1 */}
                        <div className='flex flex-col gap-5 hover:bg-white hover:shadow-[0_15px_50px_rgba(0,0,0,0.1)] rounded-3xl py-10 px-10 transform transition duration-300 ease-in-out'>
                            <img className='w-[64px]' src={Icon1} alt="Icon 1" />
                            <div className='font-outfit'>
                                <h4 className='font-semibold text-[20px]'>Atur Anggaran</h4>
                                <p className='font-normal text-[16px]'>Tetapkan anggaran sesuai kebutuhan dan kendalikan pengeluaran agar tetap sesuai rencana.</p>
                            </div>
                        </div>

                        {/* card 2 */}
                        <div className='flex flex-col gap-5 hover:bg-white hover:shadow-[0_15px_50px_rgba(0,0,0,0.1)] rounded-3xl py-10 px-10'>
                            <img className='w-[64px]' src={Icon2} alt="Icon 2" />
                            <div className='font-outfit'>
                                <h4 className='font-semibold text-[20px]'>Pantau Real-time</h4>
                                <p className='font-normal text-[16px]'>Pantau kondisi keuangan kapan saja, sehingga bisa mengambil keputusan yang lebih bijak.</p>
                            </div>
                        </div>

                        {/* card 3 */}
                        <div className='flex flex-col gap-5 hover:bg-white hover:shadow-[0_15px_50px_rgba(0,0,0,0.1)] rounded-3xl py-10 px-10'>
                            <img className='w-[64px]' src={Icon3} alt="Icon 3" />
                            <div className='font-outfit'>
                                <h4 className='font-semibold text-[20px]'>Catat Transaksi</h4>
                                <p className='font-normal text-[16px]'>Pantau kondisi keuangan kapan saja, sehingga bisa mengambil keputusan yang lebih bijak.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4 */}
            <div className='lg:px-20 px-10'>

                <div div className='relative my-20' >
                    <img className='absolute z-10 -top-20 left-0 -mx-10 lg:-mx-20' src={Bg5} alt="Background 5" />
                    <h3 className='font-outfit text-center font-bold text-[32px] text-[#9B51E0]'>Finansial Literation</h3>

                    <div className='flex justify-between mt-14'>
                        <h4 className='text-[#16294A] font-bold text-[24px]'>Articles</h4>
                        <button className='text-[#16294A] font-semibold text-[16px]'>See All</button>
                    </div>
                    <div>
                        <div>
                            <CardArticle />
                        </div>
                    </div>
                </div >
            </div>

            {/* Section 5 */}
            <div className='relative'>
                <img className='absolute w-screen z-0' src={Bg6} alt="Background waves" />
                <div div className='lg:px-20 px-10' >
                    <div className='relative z-10 flex gap-20 py-40 items-center'>
                        <img data-aos="fade-right" className='w-[450px]' src={Donasi} alt="Donasi" />
                        <div className='font-poppins'>
                            <h3 className='text-[#9B51E0] font-bold text-[32px]'>Indahnya Berbagi, Bijak Mengatur Rezeki</h3>
                            <p className='text-[#333333] font-normal text-[16px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled i</p>
                            <button className=' bg-[#9B51E0] font-semibold text-white py-3 px-6 rounded-2xl  mt-6 tracking-wide cursor-pointer'>Donasi</button>
                        </div>
                    </div>
                </div >
            </div>

            {/* Apa Kata Mereka */}
            <div lg:px-20 px-10>
                <h3 className=' font-outfit text-center font-bold text-[32px] text-[#9B51E0]'>Apa kata mereka? <br /> Dengan ada nya aplikasi finansial ini</h3>
                <CardTestimoni />
            </div>

            {/* Footer */}
            
            <Footer />

        </>
    )
}
