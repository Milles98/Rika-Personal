import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllInvoices = () => {
    const [invoices, setInvoices] = useState([]); // Lista över fakturor
    const [error, setError] = useState(""); // För att visa felmeddelanden
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                // Dummy data för testning
                const dummyInvoices = [
                    { id: 1, customerName: "Richard Chalk", date: "2024-11-12", total: 1000 },
                    { id: 2, customerName: "Hans Mattin-Lassei", date: "2024-11-11", total: 1500 },
                ];
                
                // Lägg till "kr" till totalbeloppet
                setInvoices(dummyInvoices.map(invoice => ({ ...invoice, total: `${invoice.total} kr` })));
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
                        {/* Iterera genom fakturor och rendera en rad för varje */}
                        {invoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td className="border border-gray-300 px-4 py-2">{invoice.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{invoice.customerName}</td>
                                <td className="border border-gray-300 px-4 py-2">{invoice.date}</td>
                                <td className="border border-gray-300 px-4 py-2">{invoice.total}</td>
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
                <p className="text-gray-600">No invoices available</p>
            )}
        </div>
    );
};

export default AllInvoices;
