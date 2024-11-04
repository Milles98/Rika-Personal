import React from 'react';

const InputField = ({ label, name, value, onChange, type = 'text', error }) => (
    <div className="mb-4">
        <label className="block text-gray-700">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder={label}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
);

export default InputField;