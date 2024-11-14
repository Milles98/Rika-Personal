import XIcon from "../../../../assets/icons/XIcon";
import CartCard from "./CartCard";

const ShoppingCartModal = ({ isOpen, onClose, cartData }) => {
  if (!isOpen) return null;
  return (
    <div className="h-full fixed right-0 w-[336px] mt-[-40px] bg-white z-50">
      <div className="flex justify-between items-center w-full bg-[#EEEEEE] px-4 py-2">
        <h1 className="font-mont">Cart</h1>
        <button onClick={onClose}>
          <XIcon />
        </button>
      </div>
      <div className="flex flex-col gap-4 p-2">
      {cartData.map((cartItems) => (
        <CartCard key={cartItems.id} data={cartItems} />
      ))}
      </div>
    </div>
  );
};

export default ShoppingCartModal;
