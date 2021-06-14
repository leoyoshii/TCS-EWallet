export function formatmoney(price: number): string {
  const idx = String(price).length - 2;

  const string2 = `${String(price).slice(0, idx)}.${String(price).slice(idx)}`;

  const finalValue = parseFloat(string2).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return finalValue;
}
