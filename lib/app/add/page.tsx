// app/add/page.tsx
'use client';

import { useState } from 'react';

export default function AddInvestmentPage() {
  const [ticker, setTicker] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Saving...');

    const res = await fetch('/api/save-investment', {
      method: 'POST',
      body: JSON.stringify({
        ticker,
        amount: parseFloat(amount),
        priceAtPurchase: parseFloat(price),
        date,
        note
      }),
    });

    if (res.ok) {
      setStatus('✅ Saved!');
      setTicker('');
      setAmount('');
      setPrice('');
      setDate('');
      setNote('');
    } else {
      setStatus('❌ Error saving');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Investment</h1>
      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Ticker (e.g. AAPL)" value={ticker} onChange={e => setTicker(e.target.value)} className="w-full p-2 border" required />
        <input type="number" step="0.01" placeholder="Amount Invested (£)" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-2 border" required />
        <input type="number" step="0.01" placeholder="Price at Time of Purchase (£)" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border" required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border" required />
        <input placeholder="Note (optional)" value={note} onChange={e => setNote(e.target.value)} className="w-full p-2 border" />
        <button type="submit" className="w-full p-2 bg-black text-white">Save Investment</button>
      </form>
      <p className="mt-2 text-center">{status}</p>
    </div>
  );
}
