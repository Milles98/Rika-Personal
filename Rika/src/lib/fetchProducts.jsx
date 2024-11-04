import { createContext, useContext } from "react";

const FetchProducts = createContext();

export const useFetchProducts = () => useContext(FetchProducts);

export const FetchProductsProvider = ({ children }) => {
  const getData = async () => {
    const res = await fetch(
      "https://productsreadall20241104171638.azurewebsites.net/Products"
    );

    return await res.json();
  };

  return (
    <FetchProducts.Provider value={{ getData }}>
      {children}
    </FetchProducts.Provider>
  );
};
