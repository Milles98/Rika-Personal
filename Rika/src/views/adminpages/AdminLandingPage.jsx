
import {useContext, useEffect} from "react";
import {AuthContext} from "../../lib/AuthProvider.jsx";
import LogoutButton from "../../common/LogoutButton.jsx";
import { useNavigate } from 'react-router-dom';

const AdminLandingPage = () => {
    const {userRole, isAuthenticated, checkAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const toCreateProduct = () => {
      navigate('/productscreate');
    };

    useEffect(() => {
        const authorizeUser = async () => {
            await checkAuth();
        }

        authorizeUser();
    }, [checkAuth]);

    if (!isAuthenticated) {
        return <div>I am not authenticated.</div>;
    }

    if (userRole !== 'Admin') {
        return <div>I am not an admin.</div>;
    }

    return (
        <div>
            <h1>Welcome admin!</h1>
            <LogoutButton/>
            <button onClick={toCreateProduct}
                    id="createButton"
                    type="submit"
                    className="w-[130px] bg-green-500 text-white p-2 rounded hover:bg-green-800 mt-4">
                    Create Product
                </button>
        </div>
    );
};

export default AdminLandingPage;