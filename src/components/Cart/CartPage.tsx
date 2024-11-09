import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { clearCart, removeFromCart, updateCartQuantity } from '../../store/cartSlice';

export const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = cart.reduce(
    (acc, purchase) =>
      acc +
      (purchase.priceDiscount || purchase.priceRegular) *
        (purchase.quantity || 1),
    0
  );

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col mb-6">
        <h1 className="text-[48px] font-bold">Cart</h1>
      </div>
      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            {cart.map((purchase) => (
              <div
                key={purchase.id}
                className="flex items-center justify-between border-solid border-colorDifferentGrey p-4 pl-6 mb-4"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => dispatch(removeFromCart(purchase.id))}
                    className="text-bgColorLightGrey hover:text-bgColorGrey"
                  >
                    &#10005;
                  </button>
                  <img
                    src={`/${purchase.images[0]}`}
                    alt={purchase.name}
                    className="w-20 h-20 object-contain rounded-md"
                  />
                  <div>
                    <h3 className="font-mont text-[14px] leading-[21px] text-left w-[330px]">
                      {purchase.name}
                    </h3>
                  </div>
                </div>
                <div className="flex justify-between w-full w-[250px] gap-4">
                  <div className="flex items-center justify-between border px-3 py-1 min-w-[160px] ">
                    <button
                      className={`w-8 h-8 justify-center ${
                        purchase.quantity === 1
                          ? 'text-colorLightGrey border-colorLightGrey border-solid'
                          : 'text-colorGrey border-colorGrey border-solid'
                      }`}
                      onClick={() =>
                        dispatch(
                          updateCartQuantity({
                            phoneId: purchase.id,
                            newQuantity: Math.max(
                              (purchase.quantity || 1) - 1,
                              1
                            ),
                          })
                        )
                      }
                    >
                      -
                    </button>
                    <span className="px-3">{purchase.quantity || 1}</span>
                    <button
                      className="w-8 h-8 justify-center text-colorGrey border-solid border-colorGrey"
                      onClick={() =>
                        dispatch(
                          updateCartQuantity({
                            phoneId: purchase.id,
                            newQuantity: (purchase.quantity || 1) + 1,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xl font-bold whitespace-nowrap">
                    ${purchase.priceDiscount || purchase.priceRegular}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/3">
            <div className="border-solid border-colorDifferentGrey p-6 ">
              <div className="flex flex-col align-center justify-center mb-3">
                <div className="flex justify-center text-[32px] font-extrabold">
                  ${totalPrice}
                </div>
                <div className="flex justify-center text-[14px] font-medium text-colorDifferentGrey">
                  Total for {cart.length} {cart.length > 1 ? 'items' : 'item'}
                </div>
              </div>
              <div className="w-full h-[1px] bg-colorDifferentGrey"></div>
              <button
                className="w-full mt-6 bg-black text-white py-3 hover:bg-gray-800"
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white w-[400px] h-[250px] p-8 shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Checkout is in Development
              </h2>
              <p className="text-lg text-gray-700">
                This feature is still being developed. Please check back later!
              </p>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => {
                  dispatch(clearCart());
                  handleCloseModal();
                }}
              >
                Clear Cart
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
