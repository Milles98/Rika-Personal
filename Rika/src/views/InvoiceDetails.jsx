import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const InvoiceDetails = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await fetch(`/api/invoices/${id}`); 
                if (!response.ok) {
                    throw new Error("Failed to fetch invoice");
                }
                const data = await response.json();
                setInvoice(data);
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
                    <p><strong>Total:</strong> ${invoice.total}</p>
                    <p><strong>Items:</strong></p>
                    <ul>
                        {invoice.items.map((item, index) => (
                            <li key={index}>{item.name} - ${item.price}</li>
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
