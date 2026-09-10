import React, { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { formatCurrency } from '../utils/formatCurrency';
import ProductModal from '../components/products/ProductModal';

const Products = () => {
  const { products, loading, error, deleteProduct, addProduct, updateProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Extract unique categories safely
  const categories = useMemo(() => {
    if (!products) return ['All'];
    const cats = new Set(products.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [products]);

  // Client-side quick filter
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(p => {
      const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.sku?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const getStockBadge = (quantity) => {
    if (quantity <= 0) {
      return <span style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}>Out of Stock</span>;
    }
    if (quantity <= 5) {
      return <span style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' }}>Low Stock</span>;
    }
    return <span style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>In Stock</span>;
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: '0 0 0.4rem 0', fontWeight: 700 }}>Inventory Assets</h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Real-time stock control, SKU tracking, and valuation.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>+</span> Add Product
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid var(--glass-border)',
            borderRadius: '8px',
            color: '#fff',
            padding: '0.65rem 1rem',
            fontSize: '0.9rem',
            width: '280px',
            outline: 'none',
          }}
        />

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: selectedCategory === cat ? '#fff' : 'var(--text-muted)',
                borderRadius: '20px',
                padding: '0.4rem 0.9rem',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Streaming product data...</div>
        ) : error ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--danger)' }}>Failed to fetch products.</div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>No products found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Try clearing filters or add your first product.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(255, 255, 255, 0.02)' }}>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>PRODUCT</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>CATEGORY</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>PRICE</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>STOCK STATUS</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr
                  key={p._id || p.id}
                  style={{
                    borderBottom: '1px solid var(--glass-border)',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{p.name}</div>
                    {p.sku && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{p.sku}</div>}
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)' }}>{p.category || 'General'}</td>
                  <td style={{ padding: '1.2rem 1.5rem', fontWeight: 600 }}>{formatCurrency(p.price)}</td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      {getStockBadge(p.quantity)}
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>({p.quantity} units)</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                    <button
                      onClick={() => handleOpenEdit(p)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#0ea5e9',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginRight: '1rem',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => (p._id || p.id) && deleteProduct(p._id || p.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--danger)',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Floating Add/Edit Modal */}
      {modalOpen && (
        <ProductModal
          isOpen={modalOpen}
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          onSave={editingProduct ? updateProduct : addProduct}
        />
      )}
    </div>
  );
};

export default Products;