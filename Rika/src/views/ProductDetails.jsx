import React from 'react'
import ImageSection from './sections/productdetails/ImageSection'
import Navbar from './sections/productdetails/NavBar'
import Detailssection from './sections/productdetails/Detailssection'
import { FetchProductProvider } from '../lib/fetchProduct'
const ProductDetails = () => {
    return (
        <FetchProductProvider>
                <Navbar />
                <ImageSection />
                <Detailssection />
        </FetchProductProvider>
    )
}

export default ProductDetails
