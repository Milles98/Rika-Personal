import React from 'react';
import {useAuth} from "../../lib/authorizeRole.jsx";
import {useCookies} from "react-cookie";

const CustomerLandingPage = () => {
    const {userRole, isAuthenticated} = useAuth();
    const [cookies] = useCookies(["jwt"]);

    if (!isAuthenticated) {
        return <div>I am not authenticated.</div>;
    }

    if (userRole !== 'Customer') {
        return <div>I am not a customer.</div>;
    }

    return (
        <div>
            <h1>Welcome customer!</h1>
        </div>
    );
};

export default CustomerLandingPage;