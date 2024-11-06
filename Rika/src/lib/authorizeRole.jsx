import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import {useCookies} from "react-cookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [cookies] = useCookies(["jwt"]);
    const [userRole, setUserRole] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = cookies.jwt;

        if (token){
            try {
                const decodedToken = jwtDecode(token);
                setUserRole(decodedToken.role);
                setIsAuthenticated(true);
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, [cookies]);

    return (
        <AuthContext.Provider value={{ userRole, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
