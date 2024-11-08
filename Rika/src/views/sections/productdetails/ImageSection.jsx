import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useFetchProduct } from '../../../lib/fetchProduct';

const ImageSection = () => {
    const { id } = useParams();
    const { getData } = useFetchProduct();
    const [productImage, setProductImage] = useState('');

    useEffect(() => {
        const fetchProductImage = async () => {
            const data = await getData(id); 
            setProductImage(data.image || 'https://via.placeholder.com/150');
        };
        fetchProductImage();
    }, [getData, id]);

    return (
        <>
            <div className="container mx-auto size-1/2">
                <div className="border-solid border-2 aspect-h-4 aspect-w-3 rounded-lg lg:block">
                    <img
                        src={productImage}
                        alt="Product"
                        className="h-full w-full object-cover object-center" />
                </div>
            </div>
        </>
    )
}
export default ImageSection
