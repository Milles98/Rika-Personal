import { createContext, useContext } from "react";

const FetchUsers = createContext();

export const useFetchProducts = () => useContext(FetchUsers);

export const FetchUsersProvider = ({ children }) => {
  const getData = async () => {
    const res = await fetch(
      "https://rika-identity-user-f5e3fddxg4bve2eg.swedencentral-01.azurewebsites.net/Customer/GetAll"
    );

    return await res.json();
  };

  return (
    <FetchProducts.Provider value={{ getData }}>
      {children}
    </FetchProducts.Provider>
  );
};