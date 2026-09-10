import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: '◧' },
  { to: '/products', label: 'Products', icon: '▦' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
];

export function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) => `mobile-nav__link ${isActive ? 'mobile-nav__link--active' : ''}`}
        >
          <span aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
