import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
const ReturnFromPayment = () => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;  // Skip if the fetch has already happened

        hasFetched.current = true;  // Mark that the fetch has happened
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        if (sessionStorage.getItem(`emailSent-${sessionId}`)) {
            console.log("email already sent")
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
            .catch((error) => console.error("Error sending email:", error));
    }, []);

    if (status === 'open') {
        return (
            <Navigate to="/checkout" />
        )
    }

    if (status === 'complete') {
        return (
            <section id="success">
                <p>
                    We appreciate your business! A confirmation email will be sent to {customerEmail}.

                    If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
            </section>
        )
    }
}
export default ReturnFromPayment;
