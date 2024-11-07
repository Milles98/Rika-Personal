import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const UpdateProduct = createContext();

export const useUpdateProduct = () => useContext(UpdateProduct);

const isValidImageURL = (url) => {
    const onlineImagePattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|tiff|svg))$/i;
    const standaloneImagePattern = /^(?=.{1,})(?:.*[\\\/])?.+\.(?:png|jpg|jpeg|gif|bmp|webp|tiff|svg)$/i;
    return onlineImagePattern.test(url) || standaloneImagePattern.test(url);
};

const validate = (formData) => {
    const errors = {};
    if (!formData.brand) errors.brand = "Brand is required.";
    if (!formData.model) errors.model = "Model is required.";
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

export const UpdateProductProvider = ({ children }) => {
    const updateProduct = async (id, formData) => {
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            return validationErrors;
        } else {
            try {
                const response = await fetch(`https://rika-kyh23net-updateproduct.azurewebsites.net/api/UpdateProduct/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const responseJson = await response.json();
                    console.log(responseJson);
                    return {}; // No errors, indicating a successful update
                } else {
                    console.error("Error updating product:", response.statusText);
                    return { general: "Failed to update product. Please try again." };
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                return { general: "Network error occurred. Please check your connection." };
            }
        }
    };

    return (
        <UpdateProduct.Provider value={{ updateProduct }}>
            {children}
        </UpdateProduct.Provider>
    );
};

UpdateProductProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
