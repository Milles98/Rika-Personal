import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ReturnFromPayment = () => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (hasFetched.current) return;

        hasFetched.current = true;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        if (sessionStorage.getItem(`emailSent-${sessionId}`)) {
            console.log("email already sent")
            setLoading(false);
            redirectToHome();
            return;
        }
        fetch(`https://localhost:7127/session-status?session_id=${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status === 'complete') {
                    sessionStorage.setItem(`emailSent-${sessionId}`, 'true');
                    console.log("Email sent successfully!");
                    setStatus(data.status);
                    setCustomerEmail(data.customer_email);
                }
            })
            .catch((error) => {
                console.error("Error sending email:", error);
                redirectToHome();
            })
            .finally(() => setLoading(false));
    }, []);

    if (status === 'open') {
        return (
            <Navigate to="/checkout" />
        )
    }

    if(loading){
        return (
            <div className="flex min-h-screen justify-center items-center">
                <div className="inline-block w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" role="status"></div>
                <span className="ml-3 text-black">Preparing your email...</span>
            </div>
        );
    }

    const redirectToHome = () => {
        navigate('/');
    }

    if (status === 'complete') {
        return (
            <section id="success" className="flex flex-col min-h-screen justify-center items-center space-y-4" >
                <p>
                    We appreciate your business! A confirmation email has been sent to {customerEmail}.
                    If you have any questions, please email <a href="mailto:orders@rika.com">orders@rika.com</a>.
                </p>
                <button
                    className="bg-black text-white font-bold px-3 py-1 lg:py-2 lg:px-4 rounded-full border border-black hover:bg-white hover:text-black transition-colors duration-300"
                    onClick={redirectToHome}>
                    Go to Home
                </button>
            </section>
        )
    }
}
export default ReturnFromPayment;
