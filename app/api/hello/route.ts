import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, _res: NextResponse) {
  return NextResponse.json({ text: 'Hello' }, { status: 200 });
}