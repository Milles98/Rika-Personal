import React from 'react'
const RedirectToPaymentForm = () => {

    const getStripe = () => {
        return window.Stripe('pk_test_51QJtOIKTnkBH3a68Mw5LucP5WEubaAfvjGdySsq0rjdisrYHxwDmbrPEzmnrSA7JjaziZdIS5ed8GP0yJ3HCu50s00sCkbfLVt');
    };
    const orderDetails = {
        emailAddress: 'asd@asd.com',
        address: 'ligmagatan 2',
        products: [
            { id: 1, model: 'Product1', quantity: 1, price: 1000 },
            { id: 2, model: 'Product2', quantity: 2, price: 2000 }
        ],
        totalAmount: 4000
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7127/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDetails),
            });
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                const stripe = await getStripe();
                stripe.redirectToCheckout({ sessionId: data.sessionId });
            } else {
                console.log(data.error);
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Payyyyyyyyyyyy</button>
        </form>
    )
}

export default RedirectToPaymentForm