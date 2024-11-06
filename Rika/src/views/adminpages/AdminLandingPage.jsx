import React from 'react';
import {useAuth} from "../../lib/authorizeRole.jsx";
import {useCookies} from "react-cookie";

const AdminLandingPage = () => {
    const {userRole, isAuthenticated} = useAuth();
    const [cookies] = useCookies(["jwt"]);

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