import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';
import { EmptyState } from '../shared/EmptyState';

export function CategoryChart({ data, loading }) {
  if (loading) {
    return <div className="chart-card"><div className="chart-card__title">Category distribution</div><div className="skeleton" style={{ height: 220, width: '100%' }} /></div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="chart-card">
        <div className="chart-card__title">Category distribution</div>
        <EmptyState icon="📊" title="No data yet" description="Add products to see this chart fill in." />
      </div>
    );
  }

  return (
    <div className="chart-card">
      <div className="chart-card__title">Category distribution</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="category" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(value) => formatCurrency(value)}
            contentStyle={{ background: 'var(--surface-raised)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
          />
          <Bar dataKey="value" fill="var(--accent)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
