import React from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../lib/authApi.js";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await authApi.post("/logout", {}, {withCredentials: true});

            if(response.status === 200){
                navigate("/login");
            }
        } catch {
            //
        }
    };

    return (
        <button onClick={handleLogout} className="bg-red-900 p-4">Logout</button>
    );
};

export default LogoutButton;
