import React, { useState, useEffect } from 'react';

const ProductModal = ({ isOpen, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    minStock: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price || '',
        quantity: product.quantity || '',
        minStock: product.minStock !== undefined ? product.minStock : '',
      });
    } else {
      setFormData({ name: '', category: '', price: '', quantity: '', minStock: '' });
    }
  }, [product]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10),
      minStock: parseInt(formData.minStock, 10),
    });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <div className="glass-panel" style={{ width: '450px', padding: '2rem' }}>
        <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.4rem' }}>
          {product ? 'Edit Product' : 'Create New Asset'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                padding: '0.65rem 0.85rem',
                color: '#fff',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '8px',
                  padding: '0.65rem 0.85rem',
                  color: '#fff',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Quantity</label>
              <input
                type="number"
                required
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '8px',
                  padding: '0.65rem 0.85rem',
                  color: '#fff',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Min Stock Threshold</label>
              <input
                type="number"
                required
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '8px',
                  padding: '0.65rem 0.85rem',
                  color: '#fff',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Category</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '8px',
                  padding: '0.65rem 0.85rem',
                  color: '#fff',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'transparent',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-muted)',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;