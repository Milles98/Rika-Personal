import React, { useContext, useEffect } from 'react'
import ArrowBack from '../../../common/ArrowBack'
import ShoppingCartIcon from '../../../assets/icons/ShoppingCartIcon'
import EditProductButton from '../../../common/EditProductButton'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../lib/AuthProvider'

const Navbar = () => {
    const { id } = useParams();
    let admin = false;
    const { userRole, isAuthenticated, checkAuth } = useContext(AuthContext);
    useEffect(() => {
        const authorizeUser = async () => {
            await checkAuth();
        }

        authorizeUser();
    }, [checkAuth]);

    if (isAuthenticated && userRole === 'Admin') {
        admin = true;
    }

    return (
        <div className='flex'>
            <div className='flex-none'>
                <ArrowBack goBackTo="/" />
            </div>

            <div className='grow'></div>
            <div className="gap-6 flex">
                {
                    admin ? (
                        <EditProductButton label="Edit Product" productId={id} />
                    ) : (
                        <div className='flex-none'>
                            <button>
                                <ShoppingCartIcon />
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar