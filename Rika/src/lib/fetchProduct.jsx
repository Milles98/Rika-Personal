
import React, { createContext, useContext } from 'react';
import PropTypes from "prop-types";

const FetchProduct = createContext();

export const useFetchProduct = () => useContext(FetchProduct);

export const FetchProductProvider = ({ children }) => {
    const getData = async (id) => {
        try {
            const response = await fetch(`https://localhost:7291/api/GetProduct/${id}`);
            const result = await response.json();
            const updatedData = Object.fromEntries(
                Object.entries(result).map(([key, value]) => [key, value ?? '']) // Replace null/undefined with empty string
            );
            return updatedData;
        } catch (err) {
            console.log("Product could not fetched");
        }
    }
    return (
        <FetchProduct.Provider value={{ getData }}>
            {children}
        </FetchProduct.Provider>
    );
};

FetchProductProvider.propTypes = {
    children: PropTypes.node.isRequired,
}