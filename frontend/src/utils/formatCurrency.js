// Formats a number as Indian Rupees with proper lakh/crore grouping,
// e.g. 2486420 -> "₹24,86,420".
export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

export function formatNumber(value) {
  return new Intl.NumberFormat('en-IN').format(value ?? 0);
}
