const ShoppingCartModal = ({ isOpen, onClose, cartData }) => {
  if (!isOpen) return null;
  return (
    <div className="h-full fixed right-0 w-[336px] mt-[-40px] bg-white z-50">
      <div className="w-full bg-[#EEEEEE] px-4 py-2">
        <h1 className="font-mont">Cart</h1>
      </div>
    </div>
  );
};

export default ShoppingCartModal;
