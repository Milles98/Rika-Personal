import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import authApi from "./authApi.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = async () => {
        try{
            const response = await authApi.get('/authorize', {withCredentials: true});
            setIsAuthenticated(response.data.isAuthenticated);
            setUserRole(response.data.role);
        } catch {
            setIsAuthenticated(false);
            setUserRole("");
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ userRole, isAuthenticated, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}