import {useAuth} from "../../lib/authorizeRole.jsx";
import React, {useEffect} from "react";

const AdminLandingPage = () => {
    const {userRole, isAuthenticated, checkAuth} = useAuth();

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
        </div>
    );
};

export default AdminLandingPage;