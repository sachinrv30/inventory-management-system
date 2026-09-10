export function Input({ label, error, hint, id, ...props }) {
  return (
    <div className="field">
      {label && <label htmlFor={id} className="field__label">{label}</label>}
      <input id={id} className={`field__input ${error ? 'field__input--error' : ''}`} {...props} />
      {error ? (
        <p className="field__error">{error}</p>
      ) : hint ? (
        <p className="field__hint">{hint}</p>
      ) : null}
    </div>
  );
}
