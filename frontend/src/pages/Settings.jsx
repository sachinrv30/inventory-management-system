import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', margin: '0 0 0.4rem 0', fontWeight: 700 }}>System Preferences</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Manage your account settings, integrations, and workspace preferences.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Profile & Workspace Panel */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>
            Workspace Profile
          </h2>
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'white'
            }}>
              SR
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Admin User</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>admin@stockpilot.tech</p>
              <button style={{ marginTop: '0.75rem', background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-main)', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>
                Change Avatar
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Workspace Name</label>
              <input type="text" defaultValue="Primary Inventory" style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0.65rem', color: 'var(--text-main)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Timezone</label>
              <select style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0.65rem', color: 'var(--text-main)', outline: 'none', appearance: 'none' }}>
                <option>Asia/Kolkata (IST)</option>
                <option>UTC</option>
                <option>America/New_York (EST)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Developer & Integrations Panel */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>
            Developer & API
          </h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', border: '1px solid var(--glass-border)', marginBottom: '1.5rem' }}>
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0' }}>Production API Key</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Used for headless inventory syncing.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="password" readOnly value="sk_live_51Nxxxxxxxxxxxxxxxxxxxx" style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--glass-border)', borderRadius: '6px', padding: '0.4rem 0.8rem', color: 'var(--text-muted)', outline: 'none', width: '200px' }} />
              <button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Reveal</button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0' }}>Real-time Webhooks</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Push notifications on low stock events.</p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} style={{ display: 'none' }} />
              <div style={{ width: '44px', height: '24px', background: notifications ? 'var(--success)' : 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', position: 'relative', transition: 'background 0.3s ease' }}>
                <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: notifications ? '23px' : '3px', transition: 'left 0.3s ease' }}></div>
              </div>
            </label>
          </div>

          {/* Theme Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0' }}>Dark Mode Theme</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Toggle Midnight Glass aesthetics.</p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={theme === 'dark'} 
                onChange={toggleTheme} 
                style={{ display: 'none' }} 
              />
              <div style={{ width: '44px', height: '24px', background: theme === 'dark' ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', position: 'relative', transition: 'background 0.3s ease' }}>
                <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: theme === 'dark' ? '23px' : '3px', transition: 'left 0.3s ease' }}></div>
              </div>
            </label>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;