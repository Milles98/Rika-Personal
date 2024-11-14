import React, { useContext, useEffect, useState } from "react";
import ArrowBack from "../../../../common/ArrowBack";
import ShoppingCartIcon from "../../../../assets/icons/ShoppingCartIcon";
import EditProductButton from "../../../../components/Product/EditProductButton";
import DeleteProductModal from "../../../../components/Product/DeleteProductModal";
import DeleteProductButton from "../../../../components/Product/DeleteProductButton";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../lib/AuthProvider";
import { useProductContext } from "../../../../lib/ProductProvider";

const Navbar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteProduct } = useProductContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  let admin = false;
  const { userRole, isAuthenticated, checkAuth } = useContext(AuthContext);
  useEffect(() => {
    const authorizeUser = async () => {
      await checkAuth();
    };

    authorizeUser();
  }, [checkAuth]);

  const handleDelete = async () => {
    try {
      const deletion = await deleteProduct(id);
      if (deletion) {
        navigate("/products?delete=success");
      }
    } catch (err) {
      alert("Fail");
    } finally {
      setIsModalOpen(false);
    }
  };

  if (isAuthenticated && userRole === "Admin") {
    admin = true;
  }

  return (
    <div className="flex">
      <div className="flex-none">
        <ArrowBack goBackTo="/" />
      </div>

      <div className="grow"></div>
      <div className="gap-6 flex">
        {admin ? (
          <div>
            <div className="pb-1 space-x-1">
              <EditProductButton label="Edit Product" productId={id} />
              <DeleteProductButton clickFunction={() => setIsModalOpen(true)} />
            </div>
            <DeleteProductModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleDelete}
            />
          </div>
        ) : (
          <div className="flex-none">
            <button>
              <ShoppingCartIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
