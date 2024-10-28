import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRightIcon, HomeIcon } from '../../assets';
import { RootState } from '../../store/store'; // Adjust path if needed

export const Breadcrumb: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();

  const productsData = useSelector((state: RootState) => state.itemsData.productsData);

  const pathParts = location.pathname.split('/').filter((part) => part);

  const categoryName = pathParts[0]
    ? pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1)
    : 'Home';

  const currentDevice = id
    ? productsData?.find((product) => product.itemId === id)
    : null;

  const breadCrumbDeviceName = currentDevice?.name;

  return (
    <nav className="flex items-center gap-2 pb-7 leading-3">
      <Link to="/" className="color-colorTextBase">
        <HomeIcon className="w-4 h-4" />
      </Link>
      <div className="text-colorGrey">
        <ArrowRightIcon />
      </div>
      {id ? (
        <Link
          to={`/${categoryName.toLowerCase()}`}
          className="text-colorGrey hover:text-colorBlack"
        >
          {categoryName}
        </Link>
      ) : (
        <div className="text-colorGrey">{categoryName}</div>
      )}
      {id && (
        <>
          <div className="text-colorGrey">
            <ArrowRightIcon />
          </div>
          <div className="text-colorGrey">{breadCrumbDeviceName}</div>
        </>
      )}
    </nav>
  );
};
