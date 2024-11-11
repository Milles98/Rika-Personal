const TempDeleteProductButton = ({ productId, type }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const isSoftDelete = type === 'soft';
        const confirmed = window.confirm(
            `Are you sure you want to ${isSoftDelete ? 'soft' : 'permanently'} delete this product?`
        );

        if (confirmed) {
            try {
                if (isSoftDelete) {
                    await softDeleteProduct(productId);
                    alert("Product soft deleted successfully.");
                } else {
                    await permanentDeleteProduct(productId);
                    alert("Product permanently deleted.");
                }
                navigate("/products"); // redirect
            } catch (error) {
                console.error(`Failed to ${isSoftDelete ? 'soft delete' : 'permanently delete'} product:`, error);
                alert(`Failed to ${isSoftDelete ? 'soft delete' : 'permanently delete'} product. Please try again.`);
            }
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-black text-white p-3 rounded-l-full hover:bg-gray-800 focus:outline-none"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 18M9 6l.01 0M15 6l.01 0M10 6h4m-1-2v2H9l1-2h4l1 2h-3v-2H7z" />
            </svg>
        </button>
    );
};

DeleteProductButton.propTypes = {
    productId: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['soft', 'permanent']).isRequired,
};

export default TempDeleteProductButton;