import { useState } from 'react';
import { StockBadge } from '../shared/StockBadge';
import { SkeletonRows, Skeleton } from '../shared/Skeleton';
import { EmptyState } from '../shared/EmptyState';
import { formatCurrency } from '../../utils/formatCurrency';
import { getStockStatus } from '../../utils/stockStatus';

const COLUMNS = ['Product', 'Category', 'Price', 'Quantity', 'Min stock', 'Inventory value', 'Status', 'Created', ''];

function CategoryGlyph({ category }) {
  return <span className="category-glyph" aria-hidden="true">{category.charAt(0)}</span>;
}

function RowMenu({ onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="row-menu">
      <button className="icon-btn" onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open} aria-label="Row actions">⋯</button>
      {open && (
        <div className="row-menu__dropdown" role="menu" onMouseLeave={() => setOpen(false)}>
          <button role="menuitem" onClick={() => { setOpen(false); onView(); }}>View</button>
          <button role="menuitem" onClick={() => { setOpen(false); onEdit(); }}>Edit</button>
          <button role="menuitem" className="row-menu__danger" onClick={() => { setOpen(false); onDelete(); }}>Delete</button>
        </div>
      )}
    </div>
  );
}

export function ProductTable({ products, loading, error, onRetry, onView, onEdit, onDelete, hasFilters }) {
  if (error) {
    return (
      <EmptyState
        icon="⚠️"
        title="Couldn't load products"
        description={error}
        action={<button className="btn btn--ghost btn--sm" onClick={onRetry}>Try again</button>}
      />
    );
  }

  if (!loading && products.length === 0) {
    return hasFilters ? (
      <EmptyState icon="🔍" title="No products found" description="Try changing your search or filters." />
    ) : (
      <EmptyState icon="📦" title="Your inventory is empty" description="Add your first product to start managing your stock." />
    );
  }

  return (
    <>
      <table className="table table--desktop">
        <thead>
          <tr>{COLUMNS.map((c) => <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {loading ? (
            <SkeletonRows rows={6} columns={COLUMNS.length} />
          ) : (
            products.map((p) => {
              const status = getStockStatus(p);
              return (
                <tr key={p.id} className="table__row">
                  <td>
                    <div className="table__product-cell">
                      <CategoryGlyph category={p.category} />
                      <span className="table__product-name">{p.name}</span>
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td>{formatCurrency(p.price)}</td>
                  <td>{p.quantity}</td>
                  <td>{p.minStock}</td>
                  <td>{formatCurrency(p.price * p.quantity)}</td>
                  <td><StockBadge status={status} /></td>
                  <td className="table__muted">{new Date(p.createdAt).toLocaleDateString('en-IN')}</td>
                  <td><RowMenu onView={() => onView(p)} onEdit={() => onEdit(p)} onDelete={() => onDelete(p)} /></td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <div className="product-cards product-cards--mobile">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="product-card">
                <Skeleton width="60%" height="16px" />
                <Skeleton width="40%" height="14px" style={{ marginTop: 8 }} />
              </div>
            ))
          : products.map((p) => {
              const status = getStockStatus(p);
              return (
                <div key={p.id} className="product-card">
                  <div className="product-card__top">
                    <div className="table__product-cell">
                      <CategoryGlyph category={p.category} />
                      <span className="table__product-name">{p.name}</span>
                    </div>
                    <RowMenu onView={() => onView(p)} onEdit={() => onEdit(p)} onDelete={() => onDelete(p)} />
                  </div>
                  <div className="product-card__meta">
                    <span>{p.category}</span>
                    <span>{formatCurrency(p.price)}</span>
                    <span>{p.quantity} units</span>
                  </div>
                  <StockBadge status={status} />
                </div>
              );
            })}
      </div>
    </>
  );
}
