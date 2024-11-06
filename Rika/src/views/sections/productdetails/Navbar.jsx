import React from 'react'
import ArrowBack from '../../../common/ArrowBack'

const Navbar = () => {
    return (
        <div className='flex'>
            <div className='flex-grow'>
                <button>
                    <ArrowBack />
                </button>
            </div>
            <div className='flex-1'>
                <button>
                    <img src="/src/assets/cart.svg" alt="" />
                </button>
            </div>
        </div>
    )
}

export default Navbar