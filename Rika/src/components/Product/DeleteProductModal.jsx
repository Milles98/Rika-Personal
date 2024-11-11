import React from 'react'

const DeleteProductModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                <p className="text-gray-600 mb-6">Do you really want to delete this item? This action cannot be undone.</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-black text-white font-bold px-3 py-1 lg:py-2 lg:px-4 rounded-full border border-black hover:bg-white hover:text-black transition-colors duration-300"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-black text-white font-bold px-3 py-1 lg:py-2 lg:px-4 rounded-full border border-black hover:bg-white hover:text-black transition-colors duration-300"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteProductModal;