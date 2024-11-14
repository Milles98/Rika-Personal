import React, { useEffect, useState } from 'react'
import ImageSection from './sections/products/productdetails/ImageSection'
import Navbar from './sections/products/productdetails/NavBar'
import Detailssection from './sections/products/productdetails/Detailssection'
import { useProductContext } from "../lib/ProductProvider";
import { useParams } from "react-router-dom";


const ProductDetails = () => {
  const { id } = useParams();
  const { getProductData } = useProductContext();
  const [productDetails, setProductDetails] = useState({
    brand: "",
    model: "",
    description: "",
    price: "",
    image: ""
  });
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      const data = await getProductData(id);
      setProductDetails(data);
    };
    fetchProductDetails();
  }, [id]);

    return (
        <>
            <Navbar />
            <ImageSection productImage={productDetails.image} />
            <Detailssection productDetails={productDetails} />
        </>
    )
}

export default ProductDetails
