import React, { useState } from 'react';

const ProductEdit = () => {
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

    const [errors, setErrors] = useState({});

    const categories = [
        'T-Shirt',
        'Underwear',
        'Pants',
    ];

    const sizes = [
        'XS',
        'S',
        'M',
        'L',
        'XL',
    ];

    const validate = () => {
        const errors = {};
        if (!formData.name) errors.name = "Product Name is required.";
        if (!formData.title) errors.title = "Title is required.";
        if (!formData.price) errors.price = "Price is required.";
        if (isNaN(formData.price) || formData.price <= 0) errors.price = "Price must be a positive number.";
        if (!formData.stock) errors.stock = "Stock is required.";
        if (isNaN(formData.stock) || formData.stock < 0) errors.stock = "Stock cannot be negative.";
        if (!formData.image) errors.image = "Image is required.";
        // if (!formData.category) errors.category = "Category is required."
        // if (!formData.size) errors.size = "Size is required";
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate first
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log("Form submitted", formData);
            // Call API if no errors
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-300">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl mb-6 text-center text-gray-800">Edit Product</h2>
                {/* Product Name */}
                <div className="mb-4">
                    <label className="block text-gray-700">Product Name*</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Product Name"
                    />
                    {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                </div>
                {/* Product Title */}
                <div className="mb-4">
                    <label className="block text-gray-700">Title*</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Product Title"
                    />
                    {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
                </div>
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
                <div className="mb-4">
                    <label className="block text-gray-700">Price (SEK)*</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Product Price"
                    />
                    {errors.price && <p className="text-red-600 text-sm">{errors.price}</p>}
                </div>
                {/* Product Category */}
                <div className="mb-4">
                    <label className="block text-gray-700">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
                </div>
                {/* Product Size */}
                <div className="mb-4">
                    <label className="block text-gray-700">Size</label>
                    <select
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    >
                        <option value="">Select a size</option>
                        {sizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    {/* {errors.size && <p className="text-red-600 text-sm">{errors.size}</p>} */}
                </div>
                {/* Image URL */}
                <div className="mb-4">
                    <label className="block text-gray-700">Image URL*</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Image URL"
                    />
                    {errors.image && <p className="text-red-600 text-sm">{errors.image}</p>}
                </div>
                {/* Product Stock */}
                <div className="mb-4">
                    <label className="block text-gray-700">Stock*</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        placeholder="Product Stock"
                    />
                    {/* {errors.stock && <p className="text-red-600 text-sm">{errors.stock}</p>} */}
                </div>
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
