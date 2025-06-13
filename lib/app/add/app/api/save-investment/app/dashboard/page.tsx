// app/dashboard/page.tsx
import Link from 'next/link';
import { getAllTrackedTickers } from '@/lib/kv';

export default async function DashboardPage() {
  const tickers = await getAllTrackedTickers();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tracked Stocks</h1>
      {tickers.length === 0 ? (
        <p>No investments added yet. <Link href="/add" className="text-blue-600 underline">Add one</Link>.</p>
      ) : (
        <ul className="space-y-3">
          {tickers.map(ticker => (
            <li key={ticker} className="border p-3 rounded">
              <Link href={`/stock/${ticker}`} className="text-xl font-semibold text-blue-600 underline">
                {ticker.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
