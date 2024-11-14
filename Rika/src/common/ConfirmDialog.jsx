import React from 'react';
import PropTypes from 'prop-types';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="confirm-dialog fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-md text-center">
      <p className="mb-4">{message}</p>
      <div className="flex justify-center space-x-4">
        <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">
          Confirm
        </button>
        <button onClick={onCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  </div>
);

ConfirmDialog.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmDialog;
