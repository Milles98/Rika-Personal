import React from 'react'

const LoginButton = ({label, color, textColor, onClick}) => {
    return (
        <button
            type="submit"
            onClick={onClick}
            style={{backgroundColor:color, color:textColor}}
                className="w-11/12 mb-4 h-12 text-white rounded-3xl p-1 font-bold size-4 border border-gray-300
                sm:w-6/12
                md:w-6/12">{label}
        </button>
    )
}
export default LoginButton
