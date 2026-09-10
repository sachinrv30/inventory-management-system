import { useState } from 'react';
import { Select } from '../shared/Select';
import { Button } from '../shared/Button';
import { CATEGORIES } from '../../utils/stockStatus';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'quantity-asc', label: 'Quantity: Low → High' },
  { value: 'quantity-desc', label: 'Quantity: High → Low' },
  { value: 'name-asc', label: 'Name: A → Z' },
];

export function Toolbar({ filters, onChange, resultCount }) {
  const [searchInput, setSearchInput] = useState(filters.search);

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchInput(value);
    onChange({ search: value });
  }

  function clearFilters() {
    setSearchInput('');
    onChange({ search: '', category: 'All', status: 'All', sort: 'newest' });
  }

  const hasActiveFilters = filters.search || filters.category !== 'All' || filters.status !== 'All';

  return (
    <div className="toolbar">
      <div className="toolbar__row">
        <div className="search-input">
          <span className="search-input__icon" aria-hidden="true">⌕</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={handleSearchChange}
            aria-label="Search products"
          />
          {searchInput && (
            <button className="search-input__clear" onClick={() => { setSearchInput(''); onChange({ search: '' }); }} aria-label="Clear search">✕</button>
          )}
        </div>

        <Select aria-label="Filter by category" value={filters.category} onChange={(e) => onChange({ category: e.target.value })}>
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>

        <Select aria-label="Filter by stock status" value={filters.status} onChange={(e) => onChange({ status: e.target.value })}>
          <option value="All">All stock statuses</option>
          <option value="healthy">Healthy</option>
          <option value="low-stock">Low stock</option>
          <option value="out-of-stock">Out of stock</option>
        </Select>

        <Select aria-label="Sort products" value={filters.sort} onChange={(e) => onChange({ sort: e.target.value })}>
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>Clear filters</Button>
        )}
      </div>

      {typeof resultCount === 'number' && (
        <p className="toolbar__result-count">{resultCount} product{resultCount === 1 ? '' : 's'} found</p>
      )}
    </div>
  );
}
