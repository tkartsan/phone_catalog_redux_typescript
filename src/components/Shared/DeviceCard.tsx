import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HeartIcon, RedHeartIcon } from '../../assets';
import { addToCart, removeFromCart } from '../../store/cartSlice';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';
import { RootState } from '../../store/store';
import { Product } from 'types/global';

interface DeviceCardProps {
  item: Product;
  isShowDiscount?: boolean;
  linkUrl?: string;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  item,
  isShowDiscount = false,
  linkUrl,
}) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const { favorites } = useSelector((state: RootState) => state.favorites);

  const isInCart = cart.some((cartItem) => cartItem.id === item.id);
  const isFavorite = favorites.some((favoriteItem) => favoriteItem.id === item.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item));
    }
  };

  const handleCartClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(addToCart(item));
    }
  };

  const priceToShow = isShowDiscount ? item.priceDiscount : item.priceRegular;
  const imageToShow = item.images ? item.images[0] : null;

  return (
    linkUrl && <Link to={linkUrl} className="no-underline">
      <div className="bg-white border-solid border-colorLightGrey p-4 flex flex-col max-w-[272px] hover:shadow-lg transition-shadow duration-200">
        <div>
          <div className="flex justify-center mb-4">
            <img
              src={`/${imageToShow}`}
              alt={item.name}
              className="w-[150px] h-[200px] object-contain transform transition-transform duration-300 hover:scale-110"
            />
          </div>
          <h3 className="font-bold text-lg text-black whitespace-normal overflow-hidden text-ellipsis min-h-[56px]">
            {item.name}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <p className="font-bold text-xl text-black">${priceToShow}</p>
            {isShowDiscount && item.priceDiscount && (
              <p className="text-gray-500 line-through">${item.priceRegular}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 text-12 font-semibold mb-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Screen</span>
              <span className="text-black text-right overflow-hidden truncate w-[120px]">
                {item.screen}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Capacity</span>
              <span className="text-black">{item.capacity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">RAM</span>
              <span className="text-black">{item.ram}</span>
            </div>
          </div>
        </div>
        <div className="mt-0 flex gap-2">
          <button
            className={`w-full px-4 py-2 border ${
              isInCart
                ? 'bg-white text-green-500 border-colorLightGrey border-solid'
                : 'bg-black text-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleCartClick();
            }}
          >
            {isInCart ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            className="w-10 h-10 flex justify-center items-center border-solid border-colorLightGrey"
            onClick={(e) => {
              e.preventDefault();
              handleToggleFavorite();
            }}
          >
            {isFavorite ? <RedHeartIcon /> : <HeartIcon />}
          </button>
        </div>
      </div>
    </Link>
  );
};
