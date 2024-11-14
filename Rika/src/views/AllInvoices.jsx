import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllInvoices = () => {
    const [invoices, setInvoices] = useState([]); // Lista över fakturor
    const [error, setError] = useState(""); // För att visa felmeddelanden
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/getallinvoices");
                if (!response.ok) {
                    throw new Error("Failed to fetch invoices");
                }
                const data = await response.json();
                // Lägg till "kr" till totalbeloppet
                setInvoices(data.map(invoice => ({
                    ...invoice,
                    amount: `${invoice.amount} kr`,
                })));
            } catch (err) {
                setError("No invoices found");
            }
        };

        fetchInvoices();
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">All Invoices</h1>

            {/* Visa felmeddelande om något går fel */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Kontrollera om det finns fakturor att visa */}
            {invoices.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-400 w-full">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Invoice ID</th>
                                <th className="border border-gray-300 px-4 py-2">Customer ID</th>
                                <th className="border border-gray-300 px-4 py-2">Date</th>
                                <th className="border border-gray-300 px-4 py-2">Amount</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Iterera genom fakturor och rendera en rad för varje */}
                            {invoices.map((invoice) => (
                                <tr key={invoice.invoiceId}>
                                    <td className="border border-gray-300 px-4 py-2">{invoice.invoiceId}</td>
                                    <td className="border border-gray-300 px-4 py-2">{invoice.customerId}</td>
                                    <td className="border border-gray-300 px-4 py-2">{invoice.date}</td>
                                    <td className="border border-gray-300 px-4 py-2">{invoice.amount}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => navigate(`/invoices/${invoice.invoiceId}`)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600">No invoices available</p>
            )}
        </div>
    );
};

export default AllInvoices;
