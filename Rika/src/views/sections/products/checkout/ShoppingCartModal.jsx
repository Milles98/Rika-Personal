import { useEffect, useState } from "react";
import XIcon from "../../../../assets/icons/XIcon";
import CartCard from "./CartCard";
import { useNavigate } from "react-router-dom";

const ShoppingCartModal = ({ isOpen, onClose, cartData }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(500);
  const [unavailable, setUnavailable] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (cartData && cartData.length > 0) {
      navigate(`/checkout`);
    }
  };

  useEffect(() => {
    if (cartData && cartData.length > 0) {
      const total = cartData.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      setTotalItems(cartData.length);
      setTotalPrice(total);
      setUnavailable(true);
    } else {
      setTotalItems(0);
      setTotalPrice(0);
      setUnavailable(false);
    }
  }, [cartData]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-50"
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 flex flex-col gap-10 w-[336px] rounded-bl-lg bg-white z-50 transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex justify-between items-center w-full bg-[#EEEEEE] px-4 py-2">
            <h1 className="font-mont">Cart</h1>
            <button onClick={onClose}>
              <XIcon />
            </button>
          </div>
          <div className="flex flex-col gap-4 p-2 overflow-y">
            {cartData.length > 0 ? (
              cartData.map((cartItem) => (
                <CartCard key={cartItem.id} data={cartItem} />
              ))
            ) : (
              <p className="text-center text-black font-mont font-semibold text-xl mt-10">
                Cart is empty
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[17px] p-4">
          <span className="flex justify-between items-center">
            <p className="text-[#666] font-mont font-medium text-sm">
              Total ({totalItems} items):
            </p>
            <span className="text-xl font-semibold font-mont">
              $
              {totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </span>
          {unavailable ? (
            <button
              onClick={handleClick}
              className="flex gap-5 justify-center px-4 py-2.5 w-full max-w-[325px] bg-black rounded-xl leading-[33.28px] text-white"
            >
              <span className="font-mont font-medium text-base">
                Proceed to Checkout
              </span>
            </button>
          ) : (
            <button className="cursor-not-allowed flex gap-5 justify-center px-4 py-2.5 w-full max-w-[325px] bg-[#CCC] rounded-xl leading-[33.28px] text-white">
              <span className="font-mont font-medium text-base">
                Proceed to Checkout
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCartModal;
