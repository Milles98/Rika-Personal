import {useAuth} from "../../lib/authorizeRole.jsx";
import {useCookies} from "react-cookie";
import { useNavigate } from 'react-router-dom';

const AdminLandingPage = () => {
    const {userRole, isAuthenticated} = useAuth();
    const [cookies] = useCookies(["jwt"]);
    
    const navigate = useNavigate();
    
    const toCreateProduct = () => {
      navigate('/productscreate');
    };

    if (!isAuthenticated) {
        return <div>I am not authenticated.</div>;
    }

    if (userRole !== 'Admin') {
        return <div>I am not an admin.</div>;
    }

    return (
        <div>
            <h1>Welcome admin!</h1>
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