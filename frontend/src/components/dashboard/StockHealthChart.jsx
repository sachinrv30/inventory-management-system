import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = {
  Healthy: 'var(--healthy)',
  'Low stock': 'var(--warning)',
  'Out of stock': 'var(--danger)',
};

export function StockHealthChart({ stats, loading }) {
  if (loading) {
    return <div className="chart-card"><div className="chart-card__title">Stock health</div><div className="skeleton" style={{ height: 220, width: '100%' }} /></div>;
  }

  const healthy = Math.max(stats.totalProducts - stats.lowStock - stats.outOfStock, 0);
  const data = [
    { name: 'Healthy', value: healthy },
    { name: 'Low stock', value: stats.lowStock },
    { name: 'Out of stock', value: stats.outOfStock },
  ].filter((d) => d.value > 0);

  return (
    <div className="chart-card">
      <div className="chart-card__title">Stock health</div>
      {data.length === 0 ? (
        <p className="chart-card__empty">No products yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: 'var(--surface-raised)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
