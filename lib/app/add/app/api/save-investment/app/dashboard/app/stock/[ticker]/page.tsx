// app/stock/[ticker]/page.tsx
import { getInvestments } from '@/lib/kv';
import { notFound } from 'next/navigation';

type Props = {
  params: { ticker: string };
};

// TEMP: Replace with real API call later
async function getMockCurrentPrice(ticker: string): Promise<number> {
  const mockPrices: Record<string, number> = {
    AAPL: 175,
    TSLA: 230,
    MSFT: 345,
  };
  return mockPrices[ticker.toUpperCase()] ?? 200;
}

export default async function StockPage({ params }: Props) {
  const { ticker } = params;
  const investments = await getInvestments(ticker);

  if (!investments || investments.length === 0) return notFound();

  const currentPrice = await getMockCurrentPrice(ticker);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{ticker.toUpperCase()} Investment Summary</h1>
      <p className="mb-6 text-gray-600">Current Price: £{currentPrice.toFixed(2)}</p>

      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Amount (£)</th>
            <th className="p-2 border">Buy Price</th>
            <th className="p-2 border">Shares</th>
            <th className="p-2 border">Value Now</th>
            <th className="p-2 border">Gain/Loss</th>
            <th className="p-2 border">%</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((inv, i) => {
            const shares = inv.amount / inv.priceAtPurchase;
            const currentValue = shares * currentPrice;
            const gain = currentValue - inv.amount;
            const gainPct = (gain / inv.amount) * 100;

            return (
              <tr key={i} className="border-t">
                <td className="p-2 border">{inv.date}</td>
                <td className="p-2 border">£{inv.amount.toFixed(2)}</td>
                <td className="p-2 border">£{inv.priceAtPurchase.toFixed(2)}</td>
                <td className="p-2 border">{shares.toFixed(2)}</td>
                <td className="p-2 border">£{currentValue.toFixed(2)}</td>
                <td className={`p-2 border ${gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  £{gain.toFixed(2)}
                </td>
                <td className={`p-2 border ${gainPct >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {gainPct.toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
