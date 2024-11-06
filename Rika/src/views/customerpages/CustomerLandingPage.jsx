import React, {useEffect} from 'react';
import {useAuth} from "../../lib/authorizeRole.jsx";

const CustomerLandingPage = () => {
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