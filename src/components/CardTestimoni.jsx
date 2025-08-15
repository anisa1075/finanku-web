import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
export default function CardTestimoni() {
    const cards = [
        { title: "Anisa", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit" },
        { title: "Zara", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit" },
        { title: "Fulan", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit" },
        { title: "Fulanah", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit" }
    ];

    return (
        <div className=" my-10 mx-auto max-w-6xl">
            <Swiper
                className="bg-transparent"
                modules={[Autoplay]}
                spaceBetween={10}
                slidesPerView={3}
                autoplay={{
                    delay: 2000, // waktu jeda 2 detik
                    disableOnInteraction: false, // tetap jalan walau di-swipe manual
                    pauseOnMouseEnter: true, //
                }}

                loop={true}

            >
                {cards.map((card, index) => (
                    <SwiperSlide key={index} className='bg-white'>
                        <div
                            className="bg-[#f5f7fb] rounded-[8px] py-6 px-10 font-poppins flex flex-col gap-2"
                        >
                            <p className='font-normal text-[14px]'>{card.desc}</p>
                            <h2 className="text-base font-semibold text-[#333333]">"{card.title}"</h2>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
