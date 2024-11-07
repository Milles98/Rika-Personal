import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from './sections/fields/InputField.jsx'
import SelectField from './sections/fields/SelectField.jsx';
import ArrowBack from './../common/ArrowBack.jsx'
import { useFetchProduct } from './../lib/fetchProduct.jsx';
import { useUpdateProduct } from '../lib/updateProduct.jsx';
import { AuthContext } from '../lib/AuthProvider.jsx';

const EditProduct = () => {
    const { id } = useParams();
    const { userRole, isAuthenticated, checkAuth, loading } = useContext(AuthContext);
    const { getData } = useFetchProduct();
    const { updateProduct } = useUpdateProduct();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [notFound, setNotFound] = useState(false);
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
        const getProduct = async () => {
            const data = await getData(id);
            setFormData(data);
    
        }
        const authorizeUser = async () => {
            await checkAuth();
        }

        setTimeout(() => {
            authorizeUser();
            getProduct();
        }, 500);
    }, [id, checkAuth]);

    // if (loading && !formData.brand) {
    //     return <div className="font-bold text-center">Loading...</div>;
    // }

    // if (notFound && !loading) {
    //     return <div className="font-bold text-center">Product not found</div>;
    // }

    if (!isAuthenticated) {
        return <div>I am not authenticated.</div>;
    }

    if (userRole !== 'Admin') {
        return <div>I am not an admin.</div>;
    }

    // TODO: Change the categories and sizes to be fetched from a database/enum
    const categories = ['T-Shirt', 'Underwear', 'Pants'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    // Change Form Data values when changing fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle validation and API call when updating
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateResponse = await updateProduct(id, formData);
        if (Object.keys(updateResponse).length > 0) {
            setErrors(updateResponse);
        } else {
            navigate('/products?update=success');
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300 p-4">
            {formData.brand && (
                <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md w-full sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <div className="flex items-center justify-between mb-6">
                        <ArrowBack goBackTo="/admin" />
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
                        error={errors.model}
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
            )}
            {(!formData.brand || loading) && (
                <div className="font-bold text-center">Loading</div>
            )}
        </div>

    );
};

export default EditProduct;
