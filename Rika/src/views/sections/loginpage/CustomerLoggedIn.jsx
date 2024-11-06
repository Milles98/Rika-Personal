import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';

const CustomerLoggedIn = () => {
    const [tokenInfo, setTokenInfo] = useState(null);
    const [isCustomer, setIsCustomer] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cookies] = useCookies(['jwt']);

    useEffect(() => {
        const token = cookies.jwt;
        console.log(token);
        if (token) {
            const decoded = jwtDecode(token);
            setTokenInfo(decoded);

            console.log(decoded);

            // Check if the token is expired
            if (decoded.exp < Date.now() / 1000) {
                // Redirect to login if expired
                window.location.href = '/login';
            }

            // Check if the user is a customer
            if (decoded.role === 'Customer') {
                setIsCustomer(true);
            }

            // Check if the user is an admin
            if (decoded.role === 'Admin') {
                setIsAdmin(true);
            }

        } else {
            // If no token, redirect to login
            window.location.href = '/login';
        }

    }, []);

    return (
        <div>
            {/* if the use state is customer display customer stuff */}
            {isCustomer && <h1 className="text-2xl">Customer Logged In</h1>}
            {/* if the use state is admin display admin stuff */}
            {isAdmin && <h1 className="text-2xl">Admin Logged In</h1>}
            {/* if the use state is neither display this */}
            {!isCustomer && !isAdmin && <h1 className="text-2xl">GUEST</h1>}


            {/* <h1 className="text-2xl">Customer Logged In</h1>
            {tokenInfo ? (
                <pre className="text-lg">{JSON.stringify(tokenInfo, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )} */}
        </div>
    );
};

export default CustomerLoggedIn;