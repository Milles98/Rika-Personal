import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import identityApi from "./../lib/identityApi.js"
import ArrowBack from './../common/ArrowBack.jsx';
import InputField from './sections/AdminCreateProduct/InputField.jsx';

const Register = () => {

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        phoneNumber: '',
        streetAddress: '',
        city: '',
        dateOfBirth: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validate = () => {
        const errors = {};
        if (!formData.username) errors.username = "User Name is required.";
        if (!formData.email) errors.email = "Email is required.";
        else if (!validateEmail(formData.email))
            {
                errors.email = "Follow the email pattern."
            }
            if (!formData.password) {
                errors.password = "Password is required.";
            } else if (formData.password.length < 6) {
                errors.password = "Password must be at least 6 characters.";
            } else if (formData.password !== formData.confirmpassword) {
                errors.password = "Passwords do not match.";
            }
        if (!formData.phoneNumber) errors.phoneNumber = "Phone Number is required.";
        if (!formData.streetAddress) errors.streetAddress = "Street Address is required.";
        if (!formData.city) errors.city = "City is required.";
        if (!formData.dateOfBirth) errors.dateOfBirth = "Date of Birth is required.";
        return errors;
    };


    const handleRegistration = async (e) => {
        e.preventDefault();
       const validationErrors = validate();
       if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
       }
        else {
            const endPoint = '/Customer/register';
            try {
                const response = await identityApi.post(endPoint, formData);
                if(response.status === 200){
                    console.log('Customer successfully created!');
                    navigate('/');
                }
                else {
                    const data = await response.json();
                    console.log(data.errors)
                }
            } catch (error) {
                console.error('Error during registration:', error);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300 p-4">
        <form onSubmit={(e) => handleRegistration(e, formData)} className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md w-full sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3">
            <div className="flex items-center justify-between mb-6">
            <ArrowBack goBackTo="/admin" />
            <h2 className="text-xl sm:text-2xl text-center flex-grow text-gray-800">Customer Registration</h2>
                <div className="sm:w-6"></div>
            </div>
            {/* User Name */}
            <InputField
                label="User Name"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
            />
            {/* Email */}
            <InputField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />
            {/* Password */}
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <InputField
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full resize-none"
                    rows="3"
                    error={errors.password}
                    type="password"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <InputField
                    name="confirmpassword"
                    value={formData.confirmpassword}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full resize-none"
                    rows="3"
                    error={errors.password}
                    type="password"
                />
            </div>
            {/* Phone Number */}
            <InputField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                type="number"
                error={errors.phoneNumber}
            />
            {/* Street Address*/}
            <InputField
                label="Street Address"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                error={errors.streetAddress}
            />
            {/* City */}
            <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
            />
            {/* Date of Birth */}
            <InputField
                label="Date of Birth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                type="date"
                error={errors.dateOfBirth}
            />
            {/* Submit Button */}
            <button 
                id="createButton"
                type="submit"
                className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 mt-4">
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

export default Register