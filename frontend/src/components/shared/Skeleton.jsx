export function Skeleton({ width = '100%', height = '14px', style }) {
  return <span className="skeleton" style={{ width, height, ...style }} />;
}

export function SkeletonRows({ rows = 5, columns = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} className="table__row table__row--skeleton">
          {Array.from({ length: columns }).map((__, c) => (
            <td key={c}><Skeleton width={c === 0 ? '70%' : '50%'} /></td>
          ))}
        </tr>
      ))}
    </>
  );
}
