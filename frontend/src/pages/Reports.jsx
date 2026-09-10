import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5050/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalItems = products.reduce((acc, p) => acc + p.quantity, 0);
  const totalValuation = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
  const categoriesCount = [...new Set(products.map(p => p.category))].length;

  const exportCSV = () => {
    const headers = "ID,Name,Category,Price,Quantity,MinStock\n";
    const rows = products.map(p => `${p.id},"${p.name}","${p.category}",${p.price},${p.quantity},${p.minStock}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nexus-inventory-audit-report.csv';
    a.click();
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#111827', margin: 0 }}>Enterprise Reports & Audits</h2>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.2rem' }}>Comprehensive asset evaluations and secure CSV data dumps.</p>
        </div>
        <button className="btn-primary-red" onClick={exportCSV}>
          📥 Export CSV Report
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="zoho-card" style={{ padding: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Total Stock Units</span>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginTop: '0.5rem' }}>{totalItems}</div>
        </div>
        <div className="zoho-card" style={{ padding: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Total Portfolio Worth</span>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#0284c7', marginTop: '0.5rem' }}>₹{totalValuation.toLocaleString()}</div>
        </div>
        <div className="zoho-card" style={{ padding: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Active Categories</span>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#16a34a', marginTop: '0.5rem' }}>{categoriesCount}</div>
        </div>
      </div>

      <div className="zoho-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>System Metadata & Ownership</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem', color: '#4b5563' }}>
          <div><strong>Engine Core:</strong> Node.js & Express REST API</div>
          <div><strong>Database:</strong> MongoDB Atlas Cluster</div>
          <div><strong>Frontend Architecture:</strong> React (Vite) + Spline 3D</div>
          <div><strong>Lead Developer:</strong> Sachin R V</div>
        </div>
      </div>
    </div>
  );
};

export default Reports;