import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await fetch("/api/invoices"); // API-endpoint för att hämta fakturor
                if (!response.ok) {
                    throw new Error("Failed to fetch invoices");
                }
                const data = await response.json();
                setInvoices(data);
            } catch (err) {
                setError("No invoices found");
            }
        };

        fetchInvoices();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">All Invoices</h1>
            {error && <p className="text-red-500">{error}</p>}
            {invoices.length > 0 ? (
                <table className="table-auto border-collapse border border-gray-400 w-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Invoice ID</th>
                            <th className="border border-gray-300 px-4 py-2">Customer</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Total</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td className="border border-gray-300 px-4 py-2">{invoice.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{invoice.customerName}</td>
                                <td className="border border-gray-300 px-4 py-2">{invoice.date}</td>
                                <td className="border border-gray-300 px-4 py-2">${invoice.total}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => navigate(`/invoices/${invoice.id}`)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No invoices available</p>
            )}
        </div>
    );
};

export default AllInvoices;
