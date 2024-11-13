import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import identityApi from "./../lib/identityApi.js";
import ArrowBack from './../common/ArrowBack.jsx';
import InputField from './sections/AdminCreateProduct/InputField.jsx';

const Register = () => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const apiUrl = 'https://rika-identity-user-f5e3fddxg4bve2eg.swedencentral-01.azurewebsites.net/Customer/Register'

    const [formData, setFormData] = useState({
        Username: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
        PostalCode: '',
        PhoneNumber: '',
        StreetAddress: '',
        City: '',
        DateOfBirth: ''
    });

    // const nameMapping = {
    //     username: 'Username',
    //     email: 'Email',
    //     password: 'Password',
    //     phoneNumber: 'PhoneNumber',
    //     postalcode: 'PostalCode',
    //     streetAddress: 'StreetAddress',
    //     city: 'City',
    //     dateOfBirth: 'DateOfBirth',
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validate = () => {
        const errors = {};
        if (!formData.Username) errors.Username = "User Name is required.";
        if (!formData.Email) errors.Email = "Email is required.";
        else if (!validateEmail(formData.Email)) {
            errors.Email = "Please enter a valid email.";
        }
        if (!formData.Password) {
            errors.Password = "Password is required.";
        } else if (formData.Password !== formData.ConfirmPassword) {
            errors.Password = "Passwords do not match.";
        } else if (formData.Password.length < 6) {
            errors.Password = "Password must be at least 6 characters.";
        }
        if (!formData.PostalCode){
            errors.PostalCode = "Postal Code is required.";
        } else if (formData.PostalCode.length < 5) {
            errors.PostalCode = "Enter at least 5 characters.";
        }
        if (!formData.PhoneNumber) errors.PhoneNumber = "Phone Number is required.";
        if (!formData.StreetAddress) errors.StreetAddress = "Street Address is required.";
        if (!formData.City) errors.City = "City is required.";
        if (!formData.DateOfBirth) errors.DateOfBirth = "Date of Birth is required.";
        return errors;
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                if (response.status === 200) {
                    navigate('/customer');
                } else if (response.status === 400) {
                    const data = await response.json();
                    const apiErrors = {};

                    console.log(data.errors)
                    if (data.errors) {
                        Object.keys(data.errors).forEach((field) => {

                            // const formField = Object.keys(nameMapping).find((key) => nameMapping[key] === field);

                            // if (formField){
                                apiErrors[field] = data.errors[field].join(' ');
                            // }
                        });
                    }

                    if(data.password){
                        Object.keys(data.password).forEach((field) => {
                            apiErrors.password = data.password[field];
                        })
                    }
                    setErrors(apiErrors);
                }
            } catch (error) {
                console.error('Error during registration:', error);
            }
        }
    };

    return (
        <div className="flex font-mont items-center justify-center min-h-screen bg-gray-300 p-4">
            <form
                onSubmit={(e) => handleRegistration(e, formData)}
                className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md w-full sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3"
            >
                <div className="flex items-center justify-between mb-6">
                    <ArrowBack goBackTo="/admin" />
                    <h2 className="text-xl sm:text-2xl text-center flex-grow text-gray-800">Customer Registration</h2>
                    <div className="sm:w-6"></div>
                </div>
                {/* User Name */}
                <InputField
                    label="User Name"
                    name="Username"
                    value={formData.Username}
                    onChange={handleChange}
                    error={errors.Username}
                />
                {/* Email */}
                <InputField
                    label="Email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    error={errors.Email}
                />
                {/* Password */}
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <InputField
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full resize-none"
                        rows="3"
                        error={errors.Password}
                        type="password"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confirm Password</label>
                    <InputField
                        name="ConfirmPassword"
                        value={formData.ConfirmPassword}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full resize-none"
                        rows="3"
                        error={errors.Password}
                        type="password"
                    />
                </div>
                {/* Phone Number */}
                <InputField
                    label="Phone Number"
                    name="PhoneNumber"
                    value={formData.PhoneNumber}
                    onChange={handleChange}
                    type="number"
                    error={errors.PhoneNumber}
                />
                {/* Street Address */}
                <InputField
                    label="Street Address"
                    name="StreetAddress"
                    value={formData.StreetAddress}
                    onChange={handleChange}
                    error={errors.StreetAddress}
                />

                {/* City */}
                <div className="flex gap-8">
                    <InputField
                    label="City"
                    name="City"
                    value={formData.City}
                    onChange={handleChange}
                    error={errors.City}
                    />

                    <InputField
                        label="Postal Code"
                        name="PostalCode"
                        value={formData.PostalCode}
                        onChange={handleChange}
                        error={errors.PostalCode}
                    />
                </div>

                {/* Date of Birth */}
                <InputField
                    label="Date of Birth"
                    name="DateOfBirth"
                    value={formData.DateOfBirth}
                    onChange={handleChange}
                    type="date"
                    error={errors.DateOfBirth}
                />
                {/* Submit Button */}
                <button
                    id="createButton"
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 mt-4"
                >
                    Register
                </button>
                <div className="w-full text-green-500 p-2 rounded mt-4 text-center">
                    <p id="successMessage" hidden>
                        Product was successfully created!
                    </p>
                </div>
                <div className="w-full text-red-500 p-2 rounded mt-4 text-center">
                    <p id="failMessage" hidden>
                        Failed to create product.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
