export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function parseCurrency(value: string) {
  const rawValue = value.replace(/\D/g, "");
  return Number(rawValue) / 100;
}
