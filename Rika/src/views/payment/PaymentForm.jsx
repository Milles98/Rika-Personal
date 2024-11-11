import React, { useCallback, useState } from 'react';
import { Elements, CardElement, useStripe, useElements, EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QJtOIKTnkBH3a68Mw5LucP5WEubaAfvjGdySsq0rjdisrYHxwDmbrPEzmnrSA7JjaziZdIS5ed8GP0yJ3HCu50s00sCkbfLVt');

function PaymentForm() {
    const [status, setStatus] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [price, setPrice] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { paymentMethod, paymentError } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        });
        const { token, error } = await stripe.createToken(cardElement);
        if (error) {
            setStatus('Error: ' + error.message);
        } else {
            const response = await fetch('https://localhost:7127/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentMethod: paymentMethod.id, totalAmount: price }),
            });
            const result = await response.json();
            console.log(result);
            if (result.success) {
                setStatus('Payment Successful');
            } else {
                setStatus('Payment Failed: ' + result.message);
            }
        }
    };

    const fetchClientSecret = useCallback(() => {
        // Create a Checkout Session
        return fetch("https://localhost:7127/create-checkout-session", {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => data.clientSecret);
    }, []);

    const options = { fetchClientSecret };

    const handleChange = (e) => {
        const { value } = e.target;
        setPrice(value);
    };

    return (
        <div>
            
            <div>

                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={options}>
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>

            </div>
        </div>
        // <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        //     <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Payment</h2>
        //     <form onSubmit={handleSubmit} className="space-y-4">
        //         <div className="mb-4">
        //             <input value={price} onChange={handleChange} type="number" />
        //             <label htmlFor="card" className="block text-lg font-medium text-gray-700">Card Details</label>
        //             <div className="mt-2">
        //                 <CardElement
        //                     options={{
        //                         style: {
        //                             base: {
        //                                 color: '#32325d',
        //                                 fontFamily: 'Arial, sans-serif',
        //                                 fontSmoothing: 'antialiased',
        //                                 fontSize: '16px',
        //                                 '::placeholder': {
        //                                     color: '#aab7c4',
        //                                 },
        //                             },
        //                         },
        //                     }}
        //                 />
        //             </div>
        //         </div>

        //         <button
        //             type="submit"
        //             disabled={!stripe}
        //             className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition duration-200"
        //         >
        //             Pay
        //         </button>
        //     </form>

        //     {status && (
        //         <div className={`mt-4 p-4 text-center rounded-md ${status.includes('Successful') ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
        //             <p>{status}</p>
        //         </div>
        //     )}
        // </div>
    );
}

export default function WrappedPaymentForm() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
}
