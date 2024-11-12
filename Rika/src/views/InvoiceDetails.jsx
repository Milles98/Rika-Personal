import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const InvoiceDetails = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                // Dummy data för testning
                const dummyInvoice = {
                    id: id,
                    customerName: "Richard Chalk",
                    date: "2024-11-12",
                    total: 120.0,
                    items: [
                        { name: "Product A", price: 500.0 },
                        { name: "Product B", price: 700.0 },
                    ],
                };
                setInvoice(dummyInvoice);
            } catch (err) {
                setError("Invoice not found");
            }
        };

        fetchInvoice();
    }, [id]);

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            {invoice ? (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Invoice Details</h1>
                    <p><strong>Invoice ID:</strong> {invoice.id}</p>
                    <p><strong>Customer:</strong> {invoice.customerName}</p>
                    <p><strong>Date:</strong> {invoice.date}</p>
                    <p><strong>Total:</strong> {invoice.total.toFixed(2)} kr</p>
                    <p><strong>Items:</strong></p>
                    <ul>
                        {invoice.items.map((item, index) => (
                            <li key={index}>{item.name} - {item.price.toFixed(2)} kr</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default InvoiceDetails;
