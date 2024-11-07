import React from 'react'
import ImageSection from './sections/productdetails/ImageSection'
import Navbar from './sections/productdetails/NavBar'
import Detailssection from './sections/productdetails/Detailssection'
import { BrowserRouter } from 'react-router-dom'

const ProductDetails = () => {
    return (
        <FetchProductProvider>
            <BrowserRouter>
                <Navbar />
                <ImageSection />
                <Detailssection />
            </BrowserRouter>
        </FetchProductProvider>
    )
}

export default ProductDetails
