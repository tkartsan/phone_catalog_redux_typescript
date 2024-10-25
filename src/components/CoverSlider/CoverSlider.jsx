import './CoverSlider.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArrowLeftIcon, ArrowRightIcon } from '../../assets';

export const CoverSlider = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/cart');
  };

  return (
    <div className="flex gap-3 mx-auto max-w-[1136px]">
      <button className="flex items-center justify-center w-8 swiper-prev-cover bg-white text-black border-1 border-solid border-gray">
        <ArrowLeftIcon />
      </button>
      <div className="w-[1040px] relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-next-cover',
            prevEl: '.swiper-prev-cover',
          }}
          pagination={{
            type: 'bullets',
            el: '.swiper-pagination',
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <img
              src={'/public/img/1.png'}
              alt="Slide 1"
              className="w-[1040px] h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-between bg-black">
              <div className="p-7">
                <div className="w-[480px] bg-colorDarkGrey rounded-[12px] p-[30px]">
                  <div className="text-colorPurple text-6xl mt-5 mb-3">
                    Now available in our store!
                  </div>
                  <div className="text-colorGrey mb-13">Be the first!</div>
                  <button
                    onClick={handleRedirect}
                    className="px-8 py-3 bg-transparent rounded-full border-[1px] border-colorGrey border-solid text-white text-lg font-medium"
                  >
                    ORDER NOW
                  </button>
                </div>
              </div>
              <img
                src={'/public/img/2-second-part.png'}
                alt="Slide 2"
                className="w-[500px] h-[400px] object-cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={'/public/img/3.png'}
              alt="Slide 3"
              className="w-[1040px] h-[400px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
        <div className="swiper-pagination absolute"></div>
      </div>
      <button className="flex items-center justify-center w-8 swiper-next-cover bg-white text-black border-1 border-solid border-gray">
        <ArrowRightIcon />
      </button>
    </div>
  );
};
