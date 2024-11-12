import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get('/api/products');
  return response.data;
};

// Soft delete a product by ID
export const softDeleteProduct = async (productId) => {
  const response = await axios.delete(`/api/products/${productId}/softDelete`); // use real endpoint
  return response.data;
};

// Permanently delete a product by ID
export const permanentDeleteProduct = async (productId) => {
  const response = await axios.delete(`/api/products/${productId}`); // use real endpoint
  return response.data;
};
