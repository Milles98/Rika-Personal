import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBack from "../common/ArrowBack";
import SearchIcon from "../assets/icons/SearchIcon";

const AllInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
<<<<<<< HEAD
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
=======
                const dummyInvoices = [
                    { id: 1, customerName: "Richard Chalk", date: "2024-11-12", total: 1000 },
                    { id: 2, customerName: "Hans Mattin-Lassei", date: "2024-11-11", total: 1500 },
                ];
                setInvoices(dummyInvoices.map(invoice => ({ ...invoice, total: `${invoice.total} kr` })));
                setFilteredInvoices(dummyInvoices.map(invoice => ({ ...invoice, total: `${invoice.total} kr` })));
>>>>>>> b577326578dd5acf3feca819203e562e3fb5cc62
            } catch (err) {
                setError("No invoices found");
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        setFilteredInvoices(
            invoices.filter(invoice =>
                invoice.customerName.toLowerCase().includes(searchTerm) ||
                invoice.id.toString().includes(searchTerm)
            )
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-mont text-[16px] font-semibold">Loading invoices...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
            <ArrowBack goBackTo="/admin" className="mb-4" />
            <h1 className="text-3xl font-bold text-center mb-6">All Invoices</h1>

            <div className="mb-6 flex justify-center">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search by invoiceID or Customer name..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="px-10 py-2 border border-none rounded-full w-full focus:outline-none focus:ring-1 focus:ring-gray-300 bg-[#F3F4F5]"
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                </div>
            </div>

<<<<<<< HEAD
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
=======
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {filteredInvoices.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Invoice ID</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Customer</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Total</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredInvoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-700">{invoice.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{invoice.customerName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{invoice.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{invoice.total}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() => navigate(`/invoices/${invoice.id}`)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-150"
>>>>>>> b577326578dd5acf3feca819203e562e3fb5cc62
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
                <p className="text-gray-600 text-center mt-4">No invoices available</p>
            )}
        </div>
    );
};

export default AllInvoices;
