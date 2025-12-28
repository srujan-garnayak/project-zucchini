"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import { Images } from "@/config/events";

export default function EventSwiper({
  events,
  onSlideChange,
}: {
  events: any[];
  onSlideChange?: (index: number) => void;
}) {
  return (
    <div className="relative w-full max-w-[90vw] text-white py-4 pl-4 md:pl-0">
      <Swiper
        slidesPerView="auto"
        spaceBetween={32}
        centeredSlides={false} // Left aligned active card
        loop={true}
        slideToClickedSlide={true}
        speed={500}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        keyboard={{
          enabled: true,
        }}
        grabCursor={true}
        modules={[Keyboard, FreeMode, Autoplay]}
        onSlideChange={(swiper) => onSlideChange?.(swiper.realIndex)}
        className="!overflow-visible transform-gpu"
      >
        {events.map((event, index) => (
          <SwiperSlide key={index} className="!w-[280px] md:!w-[300px] group">
            {/* Card Container - Transforms based on group active state */}
            <div
              className={`
                relative h-[346px] md:h-[371px] w-full
                transition-all duration-500 ease-out
                scale-90 opacity-60  z-10 origin-left
                group-[.swiper-slide-active]:scale-100 
                group-[.swiper-slide-active]:opacity-100 
                group-[.swiper-slide-active]:blur-0 
                group-[.swiper-slide-active]:z-20 
                group-[.swiper-slide-active]:shadow-2xl
              `}
            >
              {/* Gradient Border/Background (Visible only when active) */}
              <div
                className="absolute inset-0 transition-opacity duration-500 opacity-0 group-[.swiper-slide-active]:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,250,190,1), rgba(231,88,31,1), rgba(141,35,87,1), rgba(5,90,68,1), rgba(251,34,158,1), rgba(153,6,190,1), rgba(255,255,255,1))",
                }}
              />

              {/* Content Container (Inset to create border effect) */}
              <div className="absolute inset-[5px] md:inset-[7px] bg-black/20">
                <PosterCard event={event} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* DECORATIVE WHITE LINES */}
      <div className="absolute top-[13px] md:top-[17px] left-[300px] md:left-[324px] right-0 h-[2px] bg-white pointer-events-none z-10" />
      <div className="absolute top-[356px] md:top-[385px] left-[300px] md:left-[324px] right-0 h-[2px] bg-white pointer-events-none z-10" />
    </div>
  );
}

function PosterCard({ event }: { event: any }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={event.posterurl || ""}
        alt={event.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 350px, 500px" // Boosted size requests for higher quality
        quality={100} // Maximum quality
        priority={true} // Prioritize loading these images
      />
    </div>
  );
}
