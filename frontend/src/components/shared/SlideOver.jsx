import { useEffect, useRef } from 'react';

export function SlideOver({ open, title, description, onClose, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();

    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="overlay overlay--right" onClick={onClose}>
      <div
        className="slide-over"
        role="dialog"
        aria-modal="true"
        aria-labelledby="slide-over-title"
        tabIndex={-1}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="slide-over__header">
          <div>
            <h3 id="slide-over-title" className="slide-over__title">{title}</h3>
            {description && <p className="slide-over__description">{description}</p>}
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="slide-over__body">{children}</div>
      </div>
    </div>
  );
}
