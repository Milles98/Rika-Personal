import React from 'react'

const DeleteProductButton = ({ clickFunction }) => {
    return (
        <button
            onClick={clickFunction}
            className="bg-black text-white font-bold px-3 py-1 lg:py-2 lg:px-4 rounded-full border border-black hover:bg-white hover:text-black transition-colors duration-300"
        >
            Delete Item
        </button>
    )
}

export default DeleteProductButton