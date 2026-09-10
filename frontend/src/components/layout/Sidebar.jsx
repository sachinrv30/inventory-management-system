import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Overview', icon: '📊' },
  { path: '/products', label: 'Inventory', icon: '📦' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];

const Sidebar = () => {
  return (
    <aside
      className="glass-panel"
      style={{
        width: '260px',
        minHeight: 'calc(100vh - 2rem)',
        margin: '1rem',
        padding: '1.75rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '1rem',
      }}
    >
      <div>
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', paddingLeft: '0.5rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              boxShadow: '0 0 15px rgba(14, 165, 233, 0.4)'
            }}
          >
            ⚡
          </div>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.5px' }}>Stockpilot</span>
            <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Enterprise Suite</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                textDecoration: 'none',
                fontSize: '0.92rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#fff' : 'var(--text-muted)',
                background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                border: isActive ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid transparent',
                transition: 'all 0.2s ease',
              })}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Quick Status Widget */}
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid var(--glass-border)',
          borderRadius: '12px',
          padding: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>API Connected</span>
        </div>
        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>MERN Engine Active</p>
      </div>
    </aside>
  );
};

export default Sidebar;