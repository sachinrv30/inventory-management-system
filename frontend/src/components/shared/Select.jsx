export function Select({ label, id, children, ...props }) {
  return (
    <div className="field">
      {label && <label htmlFor={id} className="field__label">{label}</label>}
      <select id={id} className="field__input field__select" {...props}>
        {children}
      </select>
    </div>
  );
}
