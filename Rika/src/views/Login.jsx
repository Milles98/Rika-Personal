﻿import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoginButton from "../common/LoginButton.jsx";
import { useCookies } from 'react-cookie';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookie, setCookie] = useCookies(['jwt']);
    const navigate = useNavigate();

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setEmailError("");

        if(!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        if(password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            return;
        }
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
            if (token) {
                //TODO fix maxAge to something else.
                setCookie('jwt', token, { path: '/', maxAge: 3600, sameSite: 'strict', secure: true });

                if(token.userRole === "Customer"){
                    navigate("/Customer");
                } else {
                    navigate("/Admin");
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="flex font-mont flex-col items-center justify-center">
            <div className="mb-10 mt-16">
                <h1 className="text-5xl text-left">RIKA</h1>
                <h2>Online Shopping</h2>
            </div>
            <div className="w-11/12 text-center mb-10">
                <h2 className="text-2xl font-semibold mb-3">Welcome!</h2>
                <p className="text-gray-500">Please login or sign to continue our app</p>
            </div>
            <form className="sm:w-6/12 w-11/12 flex flex-col items-center mb-4" onSubmit={handleLogin}>
                <label className="font-semibold w-11/12" htmlFor="email">Email</label>
                <input
                    className="w-11/12 border-b border-gray-300 mb-6"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter email address"
                    onChange={(e) => setEmail(e.target.value)} />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

                <label className="font-semibold w-11/12" htmlFor="password">Password</label>
                <input
                    className="w-11/12 border-b border-gray-300 mb-12"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)} />
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

                    <div className='flex justify-center items-center gap-2 mb-4'>
                        <p className="mb-1">Remember me</p>
                        <input type="checkbox" />
                    </div>
                <LoginButton color="#000" label={"Login"} />
            </form>

            <div className="mb-8 text-gray-400">───────────── or ─────────────</div>
            <div className='sm:w-6/12 w-11/12 flex flex-col items-center'>
                <LoginButton color="#3b5998" label={"Continue with Facebook"} />
                <LoginButton color="#FFF" textColor="#666" label={"Continue with Google"} />
                <LoginButton color="#FFF" textColor="#666" label={"Continue with Apple"} />
            </div>
        </div>
    );
};

export default Login;