import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import testi1 from "../assets/testi1.jpg";
import testi2 from "../assets/testi2.jpg";
import testi3 from "../assets/testi3.jpg";
import testi4 from "../assets/testi4.jpg";
export default function CardTestimoni() {
    const cards = [
        { img: testi1, title: "Dewi, Ibu Rumah Tangga", desc: "Mengatur keuangan rumah tangga kadang bikin pusing. Dengan FinankuApp, saya bisa lihat pemasukan dan pengeluaran secara jelas. Jadi lebih gampang menentukan prioritas kebutuhan keluarga." },
        { img: testi2, title: "Sinta, Karyawan Swasta", desc: "Setiap gajian sering bingung uang kemana saja. Sejak pakai FinankuApp, semua tercatat rapi. Saya jadi tahu budget mana yang harus saya simpan dan bisa memperbaikinya bulan berikutnya." },
        { img: testi3, title: "Arif, Freelancer", desc: "Sebagai freelancer, penghasilan saya tidak tetap. FinankuApp membantu saya memisahkan dana kebutuhan pokok, tabungan, dan hiburan. Hidup jadi lebih terencana meskipun penghasilan tidak menentu." },
        { img: testi4, title: "Rizky, Mahasiswa", desc: "Dulu uang bulanan saya sering habis di awal bulan tanpa sadar. Sejak pakai FinankuApp, saya jadi lebih teratur mencatat pengeluaran harian. Alhamdulillah, sekarang selalu ada sisa untuk ditabung." }
    ];

    

    return (
        <div className=" my-10 mx-auto max-w-6xl">
            <Swiper
                className="bg-transparent"
                modules={[Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                autoplay={{
                    delay: 2000, // waktu jeda 2 detik
                    disableOnInteraction: false, // tetap jalan walau di-swipe manual
                    pauseOnMouseEnter: true, //
                }}

                loop={true}
                breakpoints={{
                    640: { // >= 640px (sm)
                        slidesPerView: 2,
                    },
                    1024: { // >= 1024px (lg)
                        slidesPerView: 3,
                    },
                }}

            >
                {cards.map((card, index) => (
                    <SwiperSlide key={index} className='bg-white mx-2 gap-10'>
                        <div
                            className="bg-[#f5f7fb] rounded-[8px] py-6 px-10 font-poppins flex flex-col gap-2 text-center items-center"
                        >
                            <img className="rounded-full w-[50px] h-[50px]" src={card.img} alt={card.title} />
                            <p className='font-normal text-[14px]'>{card.desc}</p>
                            <h2 className="text-base font-semibold text-[#333333]">"{card.title}"</h2>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
