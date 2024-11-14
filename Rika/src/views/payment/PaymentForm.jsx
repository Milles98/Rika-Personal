import React, { useCallback, useState } from 'react';
import { Elements, EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51QJtOIKTnkBH3a68Mw5LucP5WEubaAfvjGdySsq0rjdisrYHxwDmbrPEzmnrSA7JjaziZdIS5ed8GP0yJ3HCu50s00sCkbfLVt');

function PaymentForm() {
    // Create a Checkout Session
    const { id } = useParams();
    const fetchClientSecret = useCallback(() => {
        return fetch(`https://localhost:7127/create-checkout-session/${id}`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => data.clientSecret);
    }, []);

    const options = { fetchClientSecret };

    return (
        <div>
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}>
                <EmbeddedCheckout className='flex min-h-screen justify-center items-center' />
            </EmbeddedCheckoutProvider>
        </div>
    );
}

export default function WrappedPaymentForm() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
}
