import React, {useContext, useEffect} from "react";
import {AuthContext} from "../../lib/AuthProvider.jsx";
import LogoutButton from "../../common/LogoutButton.jsx";

const AdminLandingPage = () => {
    const {userRole, isAuthenticated, checkAuth} = useContext(AuthContext);

    useEffect(() => {
        const authorizeUser = async () => {
            await checkAuth();
        }

        authorizeUser();
    }, [checkAuth]);

    if (!isAuthenticated) {
        return <div>I am not authenticated.</div>;
    }

    if (userRole !== 'Admin') {
        return <div>I am not an admin.</div>;
    }

    return (
        <div>
            <h1>Welcome admin!</h1>
            <LogoutButton/>
        </div>
    );
};

export default AdminLandingPage;