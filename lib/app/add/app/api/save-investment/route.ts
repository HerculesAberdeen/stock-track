// app/api/save-investment/route.ts
import { NextResponse } from 'next/server';
import { saveInvestment } from '@/lib/kv';

export async function POST(req: Request) {
  const body = await req.json();
  const { ticker, amount, priceAtPurchase, date, note } = body;

  if (!ticker || !amount || !priceAtPurchase || !date) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  await saveInvestment(ticker, {
    amount,
    priceAtPurchase,
    date,
    note,
  });

  return NextResponse.json({ success: true });
}
