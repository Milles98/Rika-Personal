// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// Create an AuthContext
const AuthContext = createContext();

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Load user from the token if available
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                
                // Check token expiration
                if (decoded.exp * 1000 > Date.now()) {
                    setUser(decoded);
                } else {
                    // Token expired
                    localStorage.removeItem("jwtToken");
                }
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);

    const login = (token) => {
        try {
            const decoded = jwtDecode(token);
            localStorage.setItem("jwtToken", token);
            setUser(decoded);
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("jwtToken");
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
