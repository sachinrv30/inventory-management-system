import React from 'react';

const SkeletonLoader = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', padding: '1rem' }}>
      {[1, 2, 3, 4].map((n) => (
        <div key={n} style={{ height: '50px', background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: '6px' }} />
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default SkeletonLoader;