import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QJtOIKTnkBH3a68Mw5LucP5WEubaAfvjGdySsq0rjdisrYHxwDmbrPEzmnrSA7JjaziZdIS5ed8GP0yJ3HCu50s00sCkbfLVt');

const RedirectToPaymentButton = ({ orderDetails }) => {
    const handleClick = async () => {
        try {
            const response = await fetch(`https://rika-payment.azurewebsites.net/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDetails),
            });
            const data = await response.json();
            if (response.ok) {
                const stripe = await stripePromise;
                stripe.redirectToCheckout({ sessionId: data.sessionId });
            } else {
                console.log("data error: " + data.error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="bg-black text-white font-bold px-3 py-1 lg:py-2 lg:px-4 rounded-full border border-black hover:bg-white hover:text-black transition-colors duration-300">
            Pay with Stripe
        </button>
    );
}

export default RedirectToPaymentButton;
