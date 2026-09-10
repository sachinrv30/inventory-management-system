import { useState, useEffect, useCallback } from 'react';
import { fetchApi } from '../services/api';
import { useToast } from '../context/ToastContext';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      // Adjust the endpoint to match your actual Express routes
      const response = await fetchApi('/products'); 
      setProducts(response.data || response); // Handle both wrapped {data: []} or direct array responses
      setError(null);
    } catch (err) {
      setError(err.message);
      showToast('Failed to load products connection.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addProduct = async (productData) => {
    try {
      const newProduct = await fetchApi('/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
      setProducts((prev) => [...prev, newProduct.data || newProduct]);
      showToast('Asset created successfully.');
    } catch (err) {
      showToast(err.message || 'Failed to create asset.', 'error');
    }
  };

  const updateProduct = async (productData) => {
    try {
      const id = productData._id || productData.id;
      const updatedProduct = await fetchApi(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      });
      setProducts((prev) =>
        prev.map((p) => (p._id === id || p.id === id ? (updatedProduct.data || updatedProduct) : p))
      );
      showToast('Asset details updated.');
    } catch (err) {
      showToast(err.message || 'Failed to update asset.', 'error');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetchApi(`/products/${id}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((p) => p._id !== id && p.id !== id));
      showToast('Asset permanently deleted.');
    } catch (err) {
      showToast('Failed to delete asset.', 'error');
    }
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: loadProducts
  };
};