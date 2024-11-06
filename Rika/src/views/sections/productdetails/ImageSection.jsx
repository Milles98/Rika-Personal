import React from 'react'
import { useEffect, useState } from "react";

const ImageSection = () => {
    return (
        <>
            <div className="container mx-auto size-1/2">
                <div className="border-solid border-2 aspect-h-4 aspect-w-3 rounded-lg lg:block">
                    <img src="https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg" alt="Two each of gray, white, and black shirts laying flat." class="h-full w-full object-cover object-center" />
                </div>
            </div>
        </>
    )
}
export default ImageSection
