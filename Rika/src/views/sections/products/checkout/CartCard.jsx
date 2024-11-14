import React from "react";

const CartCard = ({ data }) => {
  const { brand, model, price, size, image, quantity } = data;

  return (
    <div className="flex gap-5 justify-between px-3.5 py-2.5 bg-white rounded-xl shadow-[0px_11px_24px_rgba(0,0,0,0.1)]">
      <div className="flex gap-1.5 text-xs leading-4">
        <img
          src={image}
          alt={`${brand}, ${model}`}
          className="object-contain shrink-0 w-20 rounded-xl aspect-square"
        />
        <div className="my-auto">
          <span className="text-sm font-mont font-medium">{brand}</span>
          <br />
          <span className="text-[#666] font-mont font-medium">{model}</span>
          <br />
          <span className="text-[#666] font-mont font-medium">
            Size: {size}
          </span>
          <br />
          <span className="text-sm font-extrabold font-mont">${price}</span>
        </div>
      </div>
      <div className="self-end flex items-center justify-evenly w-[70px] h-[30px] rounded-[30px] px-1 bg-[#EEEEEE]">
        <button onClick={() => handleSub()}>-</button>
        <span className="font-mont font-medium min-w-5 text-center">
          {quantity}
        </span>
        <button onClick={() => handleAdd()}>+</button>
      </div>
    </div>
  );
};

export default CartCard;
