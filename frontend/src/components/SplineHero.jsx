import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineHero = () => {
  return (
    <div className="zoho-card" style={{ height: '240px', position: 'relative', overflow: 'hidden', marginBottom: '1.5rem', background: '#0f172a' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
      </div>
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 2, pointerEvents: 'none' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#e53935', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Autonomous Command Center v2.4
        </span>
        <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '700', margin: '0.2rem 0 0 0' }}>
          Nexus Inventory AI
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
          Architected & Engineered by <strong style={{ color: '#38bdf8' }}>Sachin R V</strong>
        </p>
      </div>
    </div>
  );
};

export default SplineHero;