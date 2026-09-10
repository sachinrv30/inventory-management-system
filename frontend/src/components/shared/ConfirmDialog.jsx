import { useEffect, useRef } from 'react';
import { Button } from './Button';

export function ConfirmDialog({ open, title, description, confirmLabel = 'Confirm', danger, onConfirm, onCancel }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();

    function handleKey(e) {
      if (e.key === 'Escape') onCancel();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="overlay" onClick={onCancel}>
      <div
        className="dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="confirm-dialog-title" className="dialog__title">{title}</h3>
        <p className="dialog__description">{description}</p>
        <div className="dialog__actions">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
