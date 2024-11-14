import React from 'react'
import RedirectToPaymentButton from './RedirectToPaymentButton';
const RedirectToPaymentForm = () => {
    const testOrderDetails = {
        orderId: 10,
        emailAddress: 'test@mail.se',
        address: 'street 2',
        products: [
            { id: 1, model: 'T-Shirt', quantity: 1, price: 1000 },
            { id: 2, model: 'Boots', quantity: 2, price: 2000 }
        ],
        totalAmount: 4000
    };
    return (
        <RedirectToPaymentButton orderDetails={testOrderDetails} />
    )
}

export default RedirectToPaymentForm