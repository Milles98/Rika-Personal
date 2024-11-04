import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InputField from '../sections/InputField.jsx'
import SelectField from '../sections/SelectField.jsx';

const ProductEdit = () => {
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        title: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: '',
        size: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`url/api/products/${id}`);
            const data = await response.json();
            setFormData(data);
        };

        fetchProduct();
    }, [id]);

    const categories = ['T-Shirt', 'Underwear', 'Pants'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    const isValidImageURL = (url) => {
        const onlineImagePattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|tiff|svg))$/i;
        const standaloneImagePattern = /^(?=.{1,})(?:.*[\\\/])?.+\.(?:png|jpg|jpeg|gif|bmp|webp|tiff|svg)$/i;
    
        return onlineImagePattern.test(url) || standaloneImagePattern.test(url);
    };
    const validate = () => {
        const errors = {};
        if (!formData.name) errors.name = "Product Name is required.";
        if (!formData.title) errors.title = "Title is required.";
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log("Form submitted", formData);
            // Call API to update product
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-300">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl mb-6 text-center text-gray-800">Edit Product</h2>
                {/* Product Name */}
                <InputField
                    label="Product Name*"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                {/* Product Title */}
                <InputField
                    label="Title*"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    error={errors.title}
                />
                {/* Product Description */}
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
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
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default ProductEdit;
