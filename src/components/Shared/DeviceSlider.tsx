import './DeviceSlider.css';
import React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowLeftIcon, ArrowRightIcon } from '../../assets';
import { DeviceCard } from '../Shared/DeviceCard';
import { Products } from 'types/global';

interface DeviceSliderProps {
  items: Products;
  title: string;
  itemType: string;
  isShowDiscount?: boolean;
  sliderId?: string;
}

export const DeviceSlider: React.FC<DeviceSliderProps> = ({
  items,
  title,
  itemType,
  isShowDiscount = false,
  sliderId = '',
}) => {
  const prevButtonClass = `swiper-prev-${sliderId}`;
  const nextButtonClass = `swiper-next-${sliderId}`;

  return (
    <div className="mx-auto max-w-[1136px]">
      <div className="flex justify-between">
        <div className="font-extrabold text-2xl leading-10">{title}</div>
        <div className="navigation-wrapper">
          <button className={prevButtonClass}>
            <ArrowLeftIcon />
          </button>
          <button className={nextButtonClass}>
            <ArrowRightIcon />
          </button>
        </div>
      </div>
      <Swiper
        spaceBetween={15}
        slidesPerView={4}
        modules={[Navigation]}
        navigation={{
          nextEl: `.${nextButtonClass}`,
          prevEl: `.${prevButtonClass}`,
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <DeviceCard
              item={item}
              isShowDiscount={isShowDiscount}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
