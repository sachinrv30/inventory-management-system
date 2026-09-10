import { Skeleton } from '../shared/Skeleton';

export function KpiCard({ label, value, tone = 'default', loading }) {
  return (
    <div className={`kpi-card kpi-card--${tone}`}>
      <p className="kpi-card__label">{label}</p>
      {loading ? <Skeleton width="70%" height="28px" /> : <p className="kpi-card__value">{value}</p>}
    </div>
  );
}
