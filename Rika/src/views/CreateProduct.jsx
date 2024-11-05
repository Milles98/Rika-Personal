import React, { useState, } from 'react';
import SelectField from './sections/AdminCreateProduct/SelectField.jsx';
import ArrowBack from './../common/ArrowBack.jsx';
import InputField from './sections/AdminCreateProduct/InputField.jsx';
import { PostProductProvider, usePostProducts } from '../lib/postProducts.jsx';

const CreateProduct = () => {
  
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: '',
        size: '',
    });

  

    const categories = ['T-Shirt', 'Underwear', 'Pants'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    // Validate image url
    const isValidImageURL = (url) => {
        const onlineImagePattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|tiff|svg))$/i;
        const standaloneImagePattern = /^(?=.{1,})(?:.*[\\\/])?.+\.(?:png|jpg|jpeg|gif|bmp|webp|tiff|svg)$/i;

        return onlineImagePattern.test(url) || standaloneImagePattern.test(url);
    };
    // Validation for the required fields.
    const validate = () => {
        const errors = {};
        if (!formData.brand) errors.brand = "Brand is required.";
        if (!formData.price) errors.price = "Price is required.";
        if (isNaN(formData.price) || formData.price <= 0) errors.price = "Price must be a positive number.";
        if (!formData.stock) errors.stock = "Stock is required.";
        if (isNaN(formData.stock) || formData.stock < 0) errors.stock = "Stock cannot be negative.";
        if (!formData.image) {
            errors.image = "Image URL is required.";
        } else if (!isValidImageURL(formData.image)) {
            errors.image = "Image URL must be a valid image format (JPEG, PNG, GIF, etc.).";
        }
        return errors;
    };
    // Change Form Data values when changing fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // Handle validation and API call when updating
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log("Form submitted", formData);
            // TODO: Call API to update product
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300 p-4">
            <form onSubmit={(e) => usePostProducts(e, formData)} className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md w-full sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <div className="flex items-center justify-between mb-6">
                    <ArrowBack goBackTo="/" />
                    <h2 className="text-xl sm:text-2xl text-center flex-grow text-gray-800">Create Product</h2>
                    <div className="sm:w-6"></div>
                </div>
                {/* Brand */}
                <InputField
                    label="Brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    error={errors.brand}
                />
                {/* Model */}
                <InputField
                    label="Model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                />
                {/* Product Description */}
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full resize-none"
                        rows="3"
                    />
                </div>
                {/* Product Price */}
                <InputField
                    label="Price (SEK)*"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    type="number"
                    error={errors.price}
                />
                {/* Product Category */}
                <SelectField
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={categories}
                />
                {/* Product Size */}
                <SelectField
                    label="Size"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    options={sizes}
                />
                {/* Image URL */}
                <InputField
                    label="Image URL*"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    error={errors.image}
                />
                {/* Product Stock */}
                <InputField
                    label="Stock*"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    type="number"
                    error={errors.stock}
                />
                {/* Submit Button */}
                <button 
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 mt-4"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;