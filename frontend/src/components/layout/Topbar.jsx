import { useTheme } from '../../context/ThemeContext';

export function Topbar({ title, subtitle }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="topbar">
      <div>
        <h1 className="topbar__title">{title}</h1>
        {subtitle && <p className="topbar__subtitle">{subtitle}</p>}
      </div>
      <button
        className="icon-btn icon-btn--outline"
        onClick={toggleTheme}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
}
