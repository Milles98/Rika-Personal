import React from 'react'

import { useEffect, useState } from 'react'
import HeartIcon from '../../../assets/icons/HeartIcon'
import ShoppingCartIcon from '../../../assets/icons/ShoppingCartIcon'
import BagWhite from '../../../assets/icons/BagWhite'
import { useFetchProduct } from '../../../lib/fetchProduct';
import { useParams } from 'react-router-dom';


const Detailssection = () => {
    const { id } = useParams();
    const { getData } = useFetchProduct();
    const [productDetails, setProductDetails] = useState({
        brand: '',
        model:'',
        description: '',
        price: '',
    });

    useEffect(() => {
        const fetchProductDetails = async () => {
            const data = await getData(id);
            setProductDetails(data);
        };
        fetchProductDetails();
    }, [getData, id]);

    return (
        <section>
            <div className='flex gap-4 px-4 py-8'>
                <div className='flex-none'>
                    <h1 className='text-black font-mont text-[18px] font-extrabold leading-[150%]'>{productDetails.brand}</h1>
                    <p className='font-mont text-[#666666]'>{productDetails.model}</p>
                    <p className='font-mont text-[#666666]'>Price: {productDetails.price}</p>
                </div>
                <div className='grow'></div>
                <div className='flex-none'>
                    <button className='bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full'>- 1 +</button>
                </div>
            </div>

            <div className='flex gap-4 px-4 flex-col'>
                <h1 className='text-black font-mont text-[18px] font-extrabold leading-[150%]'>Description</h1>
                <p className='font-mont text-[#666666]'>{productDetails.description}</p>
            </div>

            <div className='flex-col gap-4 px-4 py-6'>
                <h1 className='text-black font-mont text-[18px] font-extrabold leading-[150%]'>Size</h1>
                <div className='flex justify-center'>
                    <div className='flex gap-4 py-4'>
                        <button className='bg-white border-2 hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded-full'>S</button>
                        <button className='bg-white border-2 hover:bg-black hover:text-white text-black font-bold py-2 px-3 rounded-full'>M</button>
                        <button className='bg-white border-2 hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded-full'>L</button>
                    </div>
                    <div className='grow'></div>
                    <div className='flex gap-3 py-6 px-3 border rounded-full'>
                        <button className='bg-[#d9ccce] border-2 hover:bg-[#d9ccce]/[.5] hover:text-white text-black font-bold px-3 rounded-full'></button>
                        <button className='bg-[#4d4a5d] border-2 hover:bg-[#4d4a5d]/[.5] hover:text-white text-black font-bold px-3 rounded-full'></button>
                        <button className='bg-[#222222] border-2 hover:bg-[#222222]/[.5] hover:text-white text-black font-bold px-3 rounded-full'></button>
                        <button className='bg-[#ffffff] border-2 hover:bg-[#808080]/[.1] hover:text-white text-black font-bold px-3 rounded-full'></button>
                    </div>
                    <div className='grow'></div>
                    <div className='flex gap-3 py-6 px-3 border rounded-full'>
                        <button className='bg-[#d9ccce] border border-2 hover:bg-[#d9ccce]/[.5] hover:text-white text-black font-bold px-3 rounded-full'></button>
                        <button className='bg-[#4d4a5d] border border-2 hover:bg-[#4d4a5d]/[.5] hover:text-white text-black font-bold px-3 rounded-full'></button>
                        <button className='bg-[#222222] border border-2 hover:bg-[#222222]/[.5] hover:text-white text-black font-bold px-3 rounded-full'></button>
                        <button className='bg-[#ffffff] border border-2 hover:bg-[#808080]/[.1] hover:text-white text-black font-bold px-3 rounded-full'></button>
                    </div>
                </div>
            </div>

            <div className='flex gap-4 px-4 py-6'>
                <button className='bg-[#ebebeb] rounded-xl px-3 py-3'><HeartIcon /></button>
                <div className='grow'></div>
                <button className='flex gap-3 items-center rounded-2xl bg-black text-white font-mont px-3'><BagWhite /> Add to cart</button>
            </div>

        </section>
    )
}

export default Detailssection
