import { type NextRequest, NextResponse } from 'next/server'

export function GET(request: NextRequest) {
  return NextResponse.rewrite(new URL(request.url))
}