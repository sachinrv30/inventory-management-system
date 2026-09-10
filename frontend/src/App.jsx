import React, { useState } from 'react';
import { LayoutDashboard, Box, Search, Bell, ChevronDown, Zap } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-app)' }}>
      {/* Dark Sidebar */}
      <aside style={{ width: '260px', background: '#090d16', color: '#94a3b8', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 10, borderRight: '1px solid #1e293b', overflow: 'hidden' }}>

        {/* Decorative wavy glow - runs the full sidebar height, matches reference image */}
        <svg
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', opacity: 0.5, pointerEvents: 'none' }}
          viewBox="0 0 260 900"
          fill="none"
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            <linearGradient id="waveLine1" x1="0" y1="0" x2="260" y2="0">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="waveLine2" x1="0" y1="0" x2="260" y2="0">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          <path d="M-20 480 Q 40 440, 90 470 T 190 460 T 290 480" stroke="url(#waveLine1)" strokeWidth="1.2" fill="none" />
          <path d="M-20 560 Q 50 520, 110 555 T 220 545 T 300 560" stroke="url(#waveLine2)" strokeWidth="1.2" fill="none" />
          <path d="M-20 640 Q 45 600, 100 635 T 200 625 T 300 645" stroke="url(#waveLine1)" strokeWidth="1" fill="none" opacity="0.7" />
          <path d="M-20 720 Q 55 680, 120 715 T 230 705 T 300 725" stroke="url(#waveLine2)" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M-20 800 Q 40 770, 95 795 T 190 790 T 290 805" stroke="url(#waveLine1)" strokeWidth="1" fill="none" opacity="0.5" />

          <circle cx="40" cy="500" r="1.5" fill="#a5b4fc" opacity="0.6" />
          <circle cx="200" cy="600" r="1.2" fill="#c4b5fd" opacity="0.5" />
          <circle cx="90" cy="700" r="1.3" fill="#818cf8" opacity="0.5" />
          <circle cx="150" cy="780" r="1" fill="#a5b4fc" opacity="0.4" />
        </svg>

        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem', borderBottom: '1px solid #1e293b', position: 'relative', zIndex: 1 }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}>
            <Zap size={17} fill="white" strokeWidth={0} />
          </div>
          <div>
            <span style={{ color: 'white', fontWeight: '700', fontSize: '1.1rem', letterSpacing: '0.02em', display: 'block' }}>Inventory Management System</span>
<span style={{ fontSize: '0.65rem', color: '#64748b' }}>Intelligence for Smarter Decisions</span>
          </div>
        </div>

        <nav style={{ padding: '1.25rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, position: 'relative', zIndex: 1 }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '0.8rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'dashboard' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
              color: activeTab === 'dashboard' ? '#ffffff' : '#94a3b8',
              fontWeight: activeTab === 'dashboard' ? '600' : '500',
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              boxShadow: activeTab === 'dashboard' ? '0 4px 15px rgba(99,102,241,0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <LayoutDashboard size={17} /> Command Center
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '0.8rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'inventory' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
              color: activeTab === 'inventory' ? '#ffffff' : '#94a3b8',
              fontWeight: activeTab === 'inventory' ? '600' : '500',
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              boxShadow: activeTab === 'inventory' ? '0 4px 15px rgba(99,102,241,0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Box size={17} /> Asset Matrix
          </button>
        </nav>

        <div style={{ padding: '1.25rem', borderTop: '1px solid #1e293b', fontSize: '0.8rem', background: 'rgba(0,0,0,0.2)', position: 'relative', zIndex: 1 }}>
          <div style={{ fontWeight: '600', color: '#ffffff', marginBottom: '0.1rem' }}>Inventory Engine</div>
          <div style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: '600' }}>Architect: Sachin R V</div>
        </div>
      </aside>

      {/* Main Workspace */}
      <div style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '70px', background: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2.5rem', position: 'sticky', top: 0, zIndex: 9 }}>
          <div style={{ width: '380px', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', color: '#94a3b8', pointerEvents: 'none', zIndex: 1 }} />
            <input
              type="text"
              className="search-input"
              placeholder="Search global database..."
              style={{ width: '100%' }}
            />
            <span style={{ position: 'absolute', right: '12px', background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#64748b', fontSize: '0.7rem', padding: '0.15rem 0.35rem', borderRadius: '4px', fontWeight: '600', pointerEvents: 'none' }}>⌘ K</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Bell size={19} color="#475569" style={{ cursor: 'pointer' }} />
            <div style={{ textAlign: 'right', lineHeight: '1.2', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <div>
                <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9rem', display: 'block' }}>Sachin R V</span>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>System Architect</span>
              </div>
              <ChevronDown size={15} color="#94a3b8" />
            </div>
            <div style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700', boxShadow: '0 2px 10px rgba(99,102,241,0.3)' }}>SR</div>
          </div>
        </header>

        <main style={{ padding: '2.5rem', flex: 1 }}>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'inventory' && <Inventory />}
        </main>
      </div>
    </div>
  );
}

export default App;