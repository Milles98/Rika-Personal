import React from "react";

const ImageSection = ({ productImage }) => {
  return (
    <>
      <div className="container mx-auto size-1/2">
      <div className="border-solid border-2 aspect-h-4 aspect-w-3 rounded-lg lg:block">
        <img
          src={productImage}
          alt="Product"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
    </>
  );
};
export default ImageSection;
