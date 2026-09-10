import { STATUS_LABELS } from '../../utils/stockStatus';

export function StockBadge({ status }) {
  return <span className={`badge badge--${status}`}>{STATUS_LABELS[status]}</span>;
}
