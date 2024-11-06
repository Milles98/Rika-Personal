import { useState, useEffect } from 'react';
// Fetch product from database based on Product Id
const fetchProduct = (id) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`https://localhost:7291/api/GetProduct/${id}`); // TODO: Change to online API URL
            const result = await response.json();
            const updatedData = Object.fromEntries(
                Object.entries(result).map(([key, value]) => [key, value ?? '']) // Replace null/undefined with empty string
            );
            setData(updatedData);
        };

        fetchProduct();
    }, [id]);

    return data;
};

export default fetchProduct;