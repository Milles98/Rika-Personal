import { createContext, useContext } from "react";

const PostProducts = createContext();

export const usePostProducts = () => useContext(PostProducts);

export const PostProductProvider = ({children}) => {

    const postProducts = async (e, productData) => {
        e.preventDefault()
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
            
            const data = await response.json();
            console.log("Product created:", data);
            return data; // Returnera data om du behöver den
        } catch (error) {
            console.error("Error posting product:", error);
            throw error;
        }
    };
    return (
        <PostProducts.Provider value={{ postProducts }}>
      {children}
    </PostProducts.Provider>
  );
};