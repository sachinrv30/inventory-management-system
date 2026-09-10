import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart3, IndianRupee, Box, Lock, AlertTriangle, CheckCircle2, PieChart, MoreHorizontal, Sparkles } from 'lucide-react';

const Dashboard = () => {
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

  // Safely parse numbers to ensure accurate comparisons
  const totalValuation = products.reduce((acc, p) => acc + (Number(p.price || 0) * Number(p.quantity || 0)), 0);
  const totalUnits = products.reduce((acc, p) => acc + Number(p.quantity || 0), 0);
  
  // Fixed low stock check (quantity <= minStock)
  const lowStockItems = products.filter(p => Number(p.quantity || 0) <= Number(p.minStock || 5));

  const categoryCounts = products.reduce((acc, p) => {
    const cat = p.category || 'General';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 140px)' }}>

      {/* Banner Header */}
      <div className="zoho-card" style={{ padding: '2.5rem 3rem', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', marginBottom: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>

        <svg width="100%" height="100%" viewBox="0 0 800 200" fill="none" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 1, pointerEvents: 'none', zIndex: 0 }}>
          <defs>
            <pattern id="dotGrid" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#6366f1" opacity="0.25" />
            </pattern>
            <linearGradient id="dotFade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="50%" stopColor="white" stopOpacity="0.2" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="dotMask">
              <rect width="800" height="200" fill="white" />
              <rect width="800" height="200" fill="url(#dotFade)" />
            </mask>
          </defs>
          <rect width="800" height="200" fill="url(#dotGrid)" mask="url(#dotMask)" />
          <circle cx="750" cy="40" r="130" fill="#6366f1" opacity="0.04" />
          <circle cx="680" cy="160" r="90" fill="#a855f7" opacity="0.04" />
        </svg>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 1, position: 'relative' }}>
          <div className="icon-badge" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', padding: '1.15rem', color: 'white', boxShadow: '0 8px 20px rgba(99,102,241,0.3)' }}>
            <BarChart3 size={28} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <Sparkles size={13} color="#6366f1" />
              <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#6366f1', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Enterprise Intelligence Active</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.025em' }}>Inventory Command Center</h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.3rem', fontWeight: '500' }}>Real-time stock valuation and enterprise analytics</p>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.75rem' }}>

        <div className="zoho-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TOTAL VALUATION</span>
              <span className="icon-badge" style={{ background: '#e0f2fe', color: '#0284c7', width: '36px', height: '36px' }}>
                <IndianRupee size={17} strokeWidth={2.4} />
              </span>
            </div>
            <div className="metric-number" style={{ fontSize: '1.7rem', fontWeight: '800', color: '#0284c7', marginTop: '0.7rem' }}>₹{totalValuation.toLocaleString()}</div>
          </div>
          <svg style={{ width: '100%', height: '26px', marginTop: '0.5rem', position: 'relative', zIndex: 1 }} viewBox="0 0 100 20" fill="none">
            <path d="M0 15 Q 25 5, 50 12 T 100 3" stroke="#0284c7" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </div>

        <div className="zoho-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TOTAL STOCK UNITS</span>
              <span className="icon-badge" style={{ background: '#ede9fe', color: '#7c3aed', width: '36px', height: '36px' }}>
                <Box size={17} strokeWidth={2.4} />
              </span>
            </div>
            <div className="metric-number" style={{ fontSize: '1.7rem', fontWeight: '800', color: '#0f172a', marginTop: '0.7rem' }}>{totalUnits}</div>
          </div>
          <svg style={{ width: '100%', height: '26px', marginTop: '0.5rem', position: 'relative', zIndex: 1 }} viewBox="0 0 100 20" fill="none">
            <path d="M0 18 Q 30 2, 60 10 T 100 5" stroke="#a855f7" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </div>

        <div className="zoho-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ACTIVE PRODUCTS</span>
              <span className="icon-badge" style={{ background: '#dcfce7', color: '#16a34a', width: '36px', height: '36px' }}>
                <Lock size={17} strokeWidth={2.4} />
              </span>
            </div>
            <div className="metric-number" style={{ fontSize: '1.7rem', fontWeight: '800', color: '#16a34a', marginTop: '0.7rem' }}>{products.length}</div>
          </div>
          <svg style={{ width: '100%', height: '26px', marginTop: '0.5rem', position: 'relative', zIndex: 1 }} viewBox="0 0 100 20" fill="none">
            <path d="M0 12 Q 40 18, 70 8 T 100 2" stroke="#16a34a" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </div>

        <div className="zoho-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LOW STOCK ALERTS</span>
              <span className="icon-badge" style={{ background: '#fee2e2', color: '#dc2626', width: '36px', height: '36px' }}>
                <AlertTriangle size={17} strokeWidth={2.4} />
              </span>
            </div>
            <div className="metric-number" style={{ fontSize: '1.7rem', fontWeight: '800', color: lowStockItems.length > 0 ? '#dc2626' : '#0f172a', marginTop: '0.7rem' }}>{lowStockItems.length}</div>
          </div>
          <svg style={{ width: '100%', height: '26px', marginTop: '0.5rem', position: 'relative', zIndex: 1 }} viewBox="0 0 100 20" fill="none">
            <path d="M0 10 Q 25 18, 60 5 T 100 15" stroke="#ef4444" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Two Column Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', flex: 1 }}>
        
        {/* Low Stock Watchlist Section */}
        <div className="zoho-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="icon-badge" style={{ background: '#ede9fe', color: '#7c3aed', width: '34px', height: '34px' }}>
                <Box size={17} strokeWidth={2.4} />
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Low Stock Watchlist</h3>
            </div>
            <MoreHorizontal size={18} color="#94a3b8" style={{ cursor: 'pointer' }} />
          </div>

          {lowStockItems.length === 0 ? (
            <div style={{ margin: 'auto', textAlign: 'center', padding: '3.5rem 0', width: '100%' }}>
              <div className="icon-badge" style={{ width: '60px', height: '60px', background: '#dcfce7', color: '#16a34a', margin: '0 auto 1.25rem auto', boxShadow: '0 8px 20px rgba(22,163,74,0.15)' }}>
                <CheckCircle2 size={28} strokeWidth={2.4} />
              </div>
              <p style={{ color: '#64748b', fontSize: '0.92rem', fontWeight: '500', margin: 0, maxWidth: '380px', marginLeft: 'auto', marginRight: 'auto' }}>All inventory stock levels are healthy. No items require immediate reordering.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '0.75rem 0.5rem', fontWeight: '700' }}>Product Name</th>
                    <th style={{ padding: '0.75rem 0.5rem', fontWeight: '700' }}>Category</th>
                    <th style={{ padding: '0.75rem 0.5rem', fontWeight: '700' }}>Stock Left</th>
                    <th style={{ padding: '0.75rem 0.5rem', fontWeight: '700' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockItems.map(item => (
                    <tr key={item._id || item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.85rem 0.5rem', fontWeight: '600', color: '#0f172a' }}>{item.name}</td>
                      <td style={{ padding: '0.85rem 0.5rem', color: '#64748b' }}>{item.category}</td>
                      <td style={{ padding: '0.85rem 0.5rem', fontWeight: '700', color: '#dc2626' }}>{item.quantity} units</td>
                      <td style={{ padding: '0.85rem 0.5rem' }}>
                        <span style={{ background: '#fee2e2', color: '#dc2626', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>Reorder</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Category Breakdown Section */}
        <div className="zoho-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="icon-badge" style={{ background: '#e0e7ff', color: '#6366f1', width: '34px', height: '34px' }}>
                <PieChart size={17} strokeWidth={2.4} />
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Category Breakdown</h3>
            </div>
            <MoreHorizontal size={18} color="#94a3b8" style={{ cursor: 'pointer' }} />
          </div>

          {Object.keys(categoryCounts).length === 0 ? (
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>No categories registered.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {Object.entries(categoryCounts).map(([cat, count]) => (
                <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 1.15rem', background: '#f8fafc', borderRadius: '14px', fontSize: '0.9rem', border: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#1e293b', fontWeight: '600' }}>{cat}</span>
                  <span style={{ background: '#e0e7ff', border: '1px solid #c7d2fe', padding: '0.2rem 0.75rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700', color: '#4f46e5' }}>{count} items</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: '0.8rem', fontWeight: '500' }}>
        <div>
          <span style={{ fontWeight: '700', color: '#94a3b8', fontSize: '0.7rem', letterSpacing: '0.08em' }}>NEXUSOS</span>
          <div style={{ width: '32px', height: '2.5px', background: 'linear-gradient(90deg, #6366f1, #a855f7)', margin: '0.35rem 0', borderRadius: '2px' }} />
          <div style={{ fontWeight: '600', color: '#0f172a' }}>Smarter <span style={{ color: '#0f172a' }}>Inventory.</span> Brighter Tomorrow.</div>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', color: '#94a3b8', fontSize: '0.78rem' }}>
          <span>Realtime Insights</span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <span>Better Decisions</span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <span>Greater Possibilities</span>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;