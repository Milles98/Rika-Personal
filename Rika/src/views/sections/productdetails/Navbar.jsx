import React from 'react'
import ArrowBack from '../../../common/ArrowBack'
import ShoppingCartIcon from '../../../assets/icons/ShoppingCartIcon'

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
                    <ShoppingCartIcon />
                </button>
            </div>
        </div>
    )
}

export default Navbar