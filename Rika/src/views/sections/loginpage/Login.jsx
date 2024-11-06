import React, { useState } from 'react';
import LoginButton from "../../../common/LoginButton.jsx";
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookie, setCookie] = useCookies(['jwt']);

    // const setCookie = (name, value, minutes) => {
    //     const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
    //     document.cookie = `${name}=${value}; expires=${expires}; path=/; Secure; SameSite=Strict`;
    // };

    // const getCookie = (name) => {
    //     const value = `; ${document.cookie}`;
    //     const parts = value.split(`; ${name}=`);
    //     if (parts.length === 2) return parts.pop().split(';').shift();
    // };

    const handleLogin = async (e) => {
        e.preventDefault();
        const tokenUrl = 'https://rika-tokenservice-agbebvf3drayfqf6.swedencentral-01.azurewebsites.net/TokenGenerator/login';
        
        try {
            const response = await fetch(tokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            const token = data.token;
            console.log("Token received:", token);

            if (token) {

                // Cookie tid är satt på 1h men vi ändrar i framtiden :)
                setCookie('jwt', token, { path: '/', maxAge: 3600, sameSite: 'strict', secure: true });
                
                window.location.href = '/CustomerLoggedIn';

            } else {
                console.error("No token found in response.");
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mb-10 mt-16">
                <h1 className="text-5xl text-left">RIKA</h1>
                <h2>Online Shopping</h2>
            </div>
            <div className="w-11/12 text-center mb-10">
                <h2 className="text-2xl font-semibold mb-3">Welcome!</h2>
                <p className="text-gray-500">Please login or sign to continue our app</p>
            </div>
            <form className="sm:w-6/12 w-11/12 flex flex-col mb-4 items-center" onSubmit={handleLogin}>
                <label className="font-semibold w-11/12" htmlFor="email">Email</label>
                <input
                    className="w-11/12 border-b border-gray-300 mb-6"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter email address"
                    onChange={(e) => setEmail(e.target.value)} />

                <label className="font-semibold w-11/12" htmlFor="password">Password</label>
                <input
                    className="w-11/12 border-b border-gray-300 mb-12"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)} />

                    <div className='flex'>
                        <p>Remember me</p>
                        <input type="checkbox" />
                    </div>
                <LoginButton color="#000" label={"Login"} />
            </form>

            <div className="mb-4 text-gray-400">───────────── or ─────────────</div>
            <div className='sm:w-6/12 w-11/12 flex flex-col items-center'>
                <LoginButton color="#3b5998" label={"Continue with Facebook"} />
                <LoginButton color="#FFF" textColor="#666" label={"Continue with Google"} />
                <LoginButton color="#FFF" textColor="#666" label={"Continue with Apple"} />
            </div>
        </div>
    );
};

export default Login;
