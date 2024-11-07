import React from 'react'
import ImageSection from './sections/productdetails/ImageSection'
import Navbar from './sections/productdetails/NavBar'
import Detailssection from './sections/productdetails/Detailssection'

const ProductDetails = () => {
    return (
        <section className="sm:px-6 md:px-8">
            <Navbar />
            <ImageSection />
            <Detailssection />
        </section>
    )
}

export default ProductDetails
