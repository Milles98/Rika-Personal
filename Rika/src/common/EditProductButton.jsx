import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const EditProductButton = ({ label = "Edit", isAdmin, productId }) => {
    const navigate = useNavigate();

    if (!isAdmin) return null;

    const handleClick = () => {
        navigate(`/admin/edit-product/${id}`)
    }

    return (
        <div className="pb-1">
            <button onClick={handleClick} className="bg-black text-white font-bold px-3 py-1 lg:py-2 lg:px-4 rounded-full border border-black hover:bg-white hover:text-black transition-colors duration-300">
                {label}
            </button>
        </div>
    );
};

EditProductButton.propTypes = {
    label: PropTypes.string,
    isAdmin: PropTypes.bool.isRequired
};

export default EditProductButton;