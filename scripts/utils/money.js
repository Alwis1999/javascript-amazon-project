export function formatCurrency(centValue) {
  return (Math.round(centValue) / 100).toFixed(2);
}
