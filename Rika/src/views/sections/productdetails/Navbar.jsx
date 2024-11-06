import React from 'react'
import ArrowBack from '../../../common/ArrowBack'
import ShoppingCartIcon from '../../../assets/icons/ShoppingCartIcon'

const Navbar = () => {
    return (
        <div className='flex'>
            <div className='flex-none'>
                <button>
                    <ArrowBack />
                </button>
            </div>

            <div className='grow'></div>
                <div className='flex-none'>
                    <button>
                        <ShoppingCartIcon />
                    </button>
                </div>
        </div>
    )
}

export default Navbar