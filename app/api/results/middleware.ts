import { NextResponse } from 'next/server';

export async function middleware(req: Request) {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  await delay(2000);
  
  return NextResponse.next();
}