import { createContext, useContext } from "react";

const FetchUsers = createContext();

export const useFetchUsers = () => useContext(FetchUsers);

export const FetchUsersProvider = ({ children }) => {
  const getData = async () => {
    const res = await fetch(
      "https://rika-identity-user-f5e3fddxg4bve2eg.swedencentral-01.azurewebsites.net/api/Customer/GetAll"
    );

    return await res.json();
  };

  return (
    <FetchUsers.Provider value={{ getData }}>
      {children}
    </FetchUsers.Provider>
  );
};