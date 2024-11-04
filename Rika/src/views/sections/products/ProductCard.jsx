import React from "react";
import BlackFavoriteIcon from "../../../assets/icons/BlackFavoriteIcon";

const ProductCard = ({ data }) => {
  const { name, image, price, title } = data;
  return (
    <article className="flex flex-col items-center justify-center gap-2 relative cursor-pointer">
      <img
        className="w-[155px] h-[177px] filter rounded-2xl"
        src={image}
        alt={name}
      />
      <div className="absolute top-[15px] right-[15px]">
        <BlackFavoriteIcon />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-black font-mont text-[14px] font-semibold">
          {title}
        </h2>
        <p className="text-[#666] font-mont font-semibold text-[11px]">
          {name}
        </p>
        <h2 className="text-blackk font-mont text-[14px] font-semibold">
          ${price}
        </h2>
      </div>
    </article>
  );
};

export default ProductCard;
