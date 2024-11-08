
import React, { createContext, useContext, useState } from 'react';
import PropTypes from "prop-types";

const FetchProduct = createContext();

export const useFetchProduct = () => useContext(FetchProduct);

export const FetchProductProvider = ({ children }) => {
    const [notFound, setNotFound] = useState(false);
    const getData = async (id) => {
        try {
            const response = await fetch(`https://rika-productreadone.azurewebsites.net/api/products/${id}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            const result = await response.json();
            const updatedData = Object.fromEntries(
                
                Object.entries(result).map(([key, value]) => [key, value ?? ''])
            );
            return updatedData;
        } catch (err) {
            console.log(err);
            setNotFound(true);
            return {};
        }
    }
    return (
        <FetchProduct.Provider value={{ getData, notFound }}>
            {children}
        </FetchProduct.Provider>
    );
};

FetchProductProvider.propTypes = {
    children: PropTypes.node.isRequired,
}