
// Validate image url
const isValidImageURL = (url) => {
    const onlineImagePattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|tiff|svg))$/i;
    const standaloneImagePattern = /^(?=.{1,})(?:.*[\\\/])?.+\.(?:png|jpg|jpeg|gif|bmp|webp|tiff|svg)$/i;

    return onlineImagePattern.test(url) || standaloneImagePattern.test(url);
};
// Validation for the required fields.
const validate = (formData) => {
    const errors = {};
    if (!formData.brand) errors.brand = "Brand is required.";
    if (!formData.price) errors.price = "Price is required.";
    if (isNaN(formData.price) || formData.price <= 0) errors.price = "Price must be a positive number.";
    if (!formData.stock) errors.stock = "Stock is required.";
    if (isNaN(formData.stock) || formData.stock < 0) errors.stock = "Stock cannot be negative.";
    if (!formData.image) {
        errors.image = "Image URL is required.";
    } else if (!isValidImageURL(formData.image)) {
        errors.image = "Image URL must be a valid image format (JPEG, PNG, GIF, etc.).";
    }
    return errors;
};

const updateProduct = async (id, formData) => {
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
        return validationErrors; 
    } else {
        try {
            const response = await fetch(`https://rika-kyh23net-updateproduct.azurewebsites.net/api/UpdateProduct/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // TODO: Add success message (after or before redirection?)
                const responseJson = await response.json();
                console.log(responseJson);
                return {};
            } else {
                // TODO: Add fail message (?)
                console.error("Error updating product:", response.statusText);
                return {};
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            return {};
        }
    }
};

export default updateProduct;