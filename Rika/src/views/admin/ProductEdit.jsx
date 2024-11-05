import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InputField from '../sections/InputField.jsx'
import SelectField from '../sections/SelectField.jsx';
import ArrowBack from '../../common/ArrowBack.jsx';

const ProductEdit = () => {
    const { id } = useParams();
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

    useEffect(() => {
        const fetchProduct = async () => {
            // Fetch first product from database
            // TODO: Fetch product based on ID from URL parameters.
            const response = await fetch(`https://productsreadall20241104171638.azurewebsites.net/Products`);
            const data = await response.json();

            const firstData = Array.isArray(data) ? data[0] : data;
            setFormData(firstData);
        };

        fetchProduct();
    }, [id]);

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
        if (errors[name]) {
            setErrors({ ...errors, [name]: undefined })
        }
    };
    // Handle validation and API call when updating
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log(formData)
            try {
                // const response = await fetch(`url/${id}`, {
                //     method: 'PUT',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(formData),
                // });

                if (response.ok) {
                    console.log("Product updated successfully");
                } else {
                    console.error("Error updating product:", response.statusText);
                    // Handle errors if needed, e.g., by setting an error message in state
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md w-full sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <div className="flex items-center justify-between mb-6">
                    <ArrowBack goBackTo="/" />
                    <h2 className="text-xl sm:text-2xl text-center flex-grow text-gray-800">Edit Product</h2>
                    <div className="sm:w-6"></div>
                </div>
                {/* Brand */}
                <InputField
                    label="Brand*"
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
                        placeholder="Product Description"
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
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default ProductEdit;
