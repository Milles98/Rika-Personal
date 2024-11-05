import React, {useState} from 'react'
import LoginButton from "../../../common/LoginButton.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const apiUrl = 'https://rika-identity-user-f5e3fddxg4bve2eg.swedencentral-01.azurewebsites.net/api/CustomerLogin/login'
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log(data)

        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mb-10 mt-16">
                <h1 className="text-5xl text-left">RIKA</h1>
                <h2>Online Shopping</h2>
            </div>
            <div className="w-11/12 text-left mb-10">
                <h2 className="text-2xl font-semibold mb-3">Welcome!</h2>
                <p className="text-gray-500">Please login or sign to continue our app</p>
            </div>
            <form className="w-11/12 flex flex-col justify-center mb-4" onSubmit={handleLogin}>
                <label className="font-semibold" htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter email address"
                    onChange={(e) => setEmail(e.target.value)}/>

                <label className="font-semibold" htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}/>
                <LoginButton color="#000" label={"Log in"}/>
            </form>

            <div className="mb-4">---or---</div>
            <LoginButton color="#3b5998" label={"Continue with Facebook"}/>
            <LoginButton color="#FFF" textColor="#666" label={"Continue with Google"}/>
            <LoginButton color="#FFF" textColor="#666" label={"Continue with Apple"}/>
        </div>
    )
}
export default Login
