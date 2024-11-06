import { createContext, useContext } from "react";

const PostProducts = createContext();

export const UsePostProducts = () => useContext(PostProducts);

export const PostProductProvider = ({ children }) => {
    const postProductsAsync = async (productData) => {
        try {
            const response = await fetch("https://rikaproductcreateapi.azurewebsites.net/CreateProduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            });
            
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }       
            return response.ok
            
        } catch (error) {
            console.error("Error posting product:", error);
            return null; 
        }
    };

    return (
        <PostProducts.Provider value={{ postProductsAsync }}>
            {children}
        </PostProducts.Provider>
    );
}


