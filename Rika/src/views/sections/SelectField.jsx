import React from 'react';

const SelectField = ({ label, name, value, onChange, options, error }) => (
    <div className="mb-4">
        <label className="block text-gray-700">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
        >
            <option value="">Select a {label.toLowerCase()}</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
);

export default SelectField;