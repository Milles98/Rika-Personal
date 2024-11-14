import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
const ReturnFromPayment = () => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
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
    }, []);

    if (status === 'open') {
        return (
            <Navigate to="/checkout" />
        )
    }

    const redirectToHome = () => {
        navigate('/');
    }

    if (status === 'complete') {
        return (
            <section id="success">
                <p>
                    We appreciate your business! A confirmation email will be sent to {customerEmail}.

                    If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
                <button onClick={redirectToHome}>Go to Home</button>
            </section>
        )
    }
}
export default ReturnFromPayment;
