import React, { createContext, useState, useContext, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    // Generate a truly unique ID
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 9999,
      }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              background: toast.type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(16, 185, 129, 0.9)',
              backdropFilter: 'blur(12px)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
              fontSize: '0.9rem',
              fontWeight: 500,
              animation: 'slideIn 0.3s ease forwards',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{toast.type === 'error' ? '⚠️' : '✅'}</span>
            {toast.message}
          </div>
        ))}
      </div>
      
      {/* Add this to index.css or keep it inline for the animation */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </ToastContext.Provider>
  );
};