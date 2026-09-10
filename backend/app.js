import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-canvas)' }}>
      {/* Dark Sidebar */}
      <aside style={{ width: '240px', background: '#181b20', color: '#9ca3af', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 10 }}>
        <div style={{ padding: '1.25rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid #2d333b' }}>
          <div style={{ background: '#e53935', width: '28px', height: '28px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>i</div>
          <span style={{ color: 'white', fontWeight: '600', fontSize: '1.1rem', letterSpacing: '0.02em' }}>Inventory</span>
        </div>

        <nav style={{ padding: '1rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '0.7rem 1rem',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'dashboard' ? '#e53935' : 'transparent',
              color: activeTab === 'dashboard' ? '#ffffff' : '#9ca3af',
              fontWeight: activeTab === 'dashboard' ? '600' : '400',
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '0.7rem 1rem',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'inventory' ? '#e53935' : 'transparent',
              color: activeTab === 'inventory' ? '#ffffff' : '#9ca3af',
              fontWeight: activeTab === 'inventory' ? '600' : '400',
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            📦 Items & Stock
          </button>
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid #2d333b', fontSize: '0.8rem', color: '#9ca3af' }}>
          <div style={{ fontWeight: '600', color: '#ffffff', marginBottom: '0.2rem' }}>Inventory System</div>
          <div style={{ fontSize: '0.75rem', color: '#e53935' }}>Developer: Sachin R V</div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div style={{ marginLeft: '240px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '60px', background: '#ffffff', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 9 }}>
          <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#374151' }}>
            Full-Stack Inventory Management System
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ background: '#e53935', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '600' }}>SR</span>
          </div>
        </header>

        <main style={{ padding: '2rem', flex: 1 }}>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'inventory' && <Inventory />}
        </main>
      </div>
    </div>
  );
}

export default App;