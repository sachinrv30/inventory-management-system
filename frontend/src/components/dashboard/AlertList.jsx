import { Link } from 'react-router-dom';
import { Skeleton } from '../shared/Skeleton';
import { EmptyState } from '../shared/EmptyState';
import { getStockStatus } from '../../utils/stockStatus';

export function AlertList({ products, loading }) {
  if (loading) {
    return (
      <div className="alert-panel">
        <h2 className="alert-panel__title">Inventory alerts</h2>
        {[0, 1, 2].map((i) => (
          <div key={i} className="alert-row">
            <Skeleton width="40%" height="16px" />
            <Skeleton width="20%" height="14px" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="alert-panel">
        <h2 className="alert-panel__title">Inventory alerts</h2>
        <EmptyState icon="🎉" title="Inventory looks healthy" description="No products currently need attention." />
      </div>
    );
  }

  return (
    <div className="alert-panel">
      <h2 className="alert-panel__title">Inventory attention required</h2>
      <div className="alert-list">
        {products.map((p) => {
          const status = getStockStatus(p);
          return (
            <div key={p.id} className={`alert-row alert-row--${status}`}>
              <div>
                <p className="alert-row__name">{p.name}</p>
                <p className="alert-row__meta">{p.category} · {p.quantity} units remaining · Minimum {p.minStock}</p>
              </div>
              <Link to="/products" className="alert-row__action">View</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
