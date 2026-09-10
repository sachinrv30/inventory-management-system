import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductModal from '../components/ProductModal';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Food', 'Stationery', 'Other'];

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5050/products');
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async (productData) => {
    try {
      if (currentProduct) {
        await axios.put(`http://localhost:5050/products/${currentProduct.id}`, productData);
      } else {
        await axios.post('http://localhost:5050/products', productData);
      }
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:5050/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#111827', margin: 0 }}>Inventory Assets</h1>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.2rem' }}>Real-time stock control, SKU tracking, and valuation.</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            setCurrentProduct(null);
            setIsModalOpen(true);
          }}
        >
          + Add Product
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center', background: '#ffffff' }}>
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: '0.6rem 0.9rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
        />
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: selectedCategory === cat ? '1px solid #0066cc' : '1px solid #e2e8f0',
                background: selectedCategory === cat ? '#eff6ff' : '#ffffff',
                color: selectedCategory === cat ? '#0066cc' : '#64748b',
                fontWeight: selectedCategory === cat ? '600' : '500',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-panel" style={{ background: '#ffffff', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: '600' }}>
              <th style={{ padding: '1rem' }}>PRODUCT</th>
              <th style={{ padding: '1rem' }}>CATEGORY</th>
              <th style={{ padding: '1rem' }}>PRICE</th>
              <th style={{ padding: '1rem' }}>STOCK STATUS</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Loading inventory...</td></tr>
            ) : filteredProducts.length === 0 ? (
              <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No products found.</td></tr>
            ) : (
              filteredProducts.map((product) => {
                const isLowStock = product.quantity <= product.minStock;
                return (
                  <tr key={product.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem', fontWeight: '500', color: '#111827' }}>{product.name}</td>
                    <td style={{ padding: '1rem', color: '#4b5563' }}>{product.category}</td>
                    <td style={{ padding: '1rem', color: '#111827', fontWeight: '600' }}>₹{product.price}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: isLowStock ? '#fee2e2' : '#dcfce7',
                        color: isLowStock ? '#991b1b' : '#166534',
                      }}>
                        {isLowStock ? `Low Stock (${product.quantity} units)` : `In Stock (${product.quantity} units)`}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button
                        onClick={() => { setCurrentProduct(product); setIsModalOpen(true); }}
                        style={{ color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer', marginRight: '1rem', fontWeight: '500' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={currentProduct}
      />
    </div>
  );
};

export default Inventory;