// Mirrors the backend's virtual `status` field so the UI can reason
// about status even before a fresh fetch (e.g. right after a local edit).
export function getStockStatus(product) {
  if (product.quantity <= 0) return 'out-of-stock';
  if (product.quantity <= product.minStock) return 'low-stock';
  return 'healthy';
}

export const STATUS_LABELS = {
  healthy: 'Healthy',
  'low-stock': 'Low stock',
  'out-of-stock': 'Out of stock',
};

export const CATEGORIES = ['Electronics', 'Clothing', 'Food', 'Stationery', 'Other'];
