import { getAllProducts } from '@/utils/helper-functions';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await getAllProducts();

  return NextResponse.json({ products }, { status: 201 });
}
