import './Header.css';

import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { HeartIcon, HomeIcon, WebsiteLogo } from '../../assets';
import { RootState } from '../../store/store';

export const Header: React.FC = () => {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/phones', label: 'Phones' },
    { to: '/tablets', label: 'Tablets' },
    { to: '/accessories', label: 'Accessories' },
  ];

  const { cart = [] } = useSelector((state: RootState) => state.cart);
  const { favorites = [] } = useSelector((state: RootState) => state.favorites);

  const favoriteCount = favorites.length;
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const navigate = useNavigate();
  const location = useLocation();

  const linkClass = (isActive: boolean) =>
    isActive
      ? 'text-xs font-extrabold uppercase text-colorBlack border-0 border-b-[10px] border-colorBlack h-full flex items-center justify-center nav-active'
      : 'text-xs font-extrabold uppercase text-colorGrey hover:text-colorGrey h-full flex items-center justify-center';

  const buttonClass = (path: string) =>
    location.pathname === path
      ? 'hover:text-colorGrey w-[86px] h-[86px] nav-active relative'
      : 'hover:text-colorGrey w-[86px] h-[86px] relative';

  return (
    <header className="w-full bg-colorBgBase h-[86px] text-colorTextBase fixed top-0 z-40">
      <div className="flex justify-between items-center container mx-auto h-full">
        <div className="flex items-center">
          <WebsiteLogo />
        </div>

        <nav className="h-full">
          <ul className="flex space-x-12 font-medium list-none h-full m-0">
            {navLinks.map((link) => (
              <li key={link.to} className="h-full">
                <NavLink
                  to={link.to}
                  className={({ isActive }) => linkClass(isActive)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center relative">
          <div className="w-[1px] h-[86px] bg-colorBorderGrey"></div>
          <button
            aria-label="Wishlist"
            className={buttonClass('/favorites')}
            onClick={() => navigate('/favorites')}
          >
            <HeartIcon className="h-6 w-6" />
            {favoriteCount > 0 && (
              <span className="absolute top-4 right-4 mt-1 mr-1 w-5 h-5 text-xs leading-5 text-white bg-red-500 rounded-full flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>
          <div className="w-[1px] h-[86px] bg-colorBorderGrey"></div>
          <button
            aria-label="Cart"
            className={buttonClass('/cart')}
            onClick={() => navigate('/cart')}
          >
            <HomeIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute top-4 right-4 mt-1 mr-1 w-5 h-5 text-xs leading-5 text-white bg-red-500 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <div className="w-[1px] h-[86px] bg-colorBorderGrey"></div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-colorBorderGrey"></div>
    </header>
  );
};
