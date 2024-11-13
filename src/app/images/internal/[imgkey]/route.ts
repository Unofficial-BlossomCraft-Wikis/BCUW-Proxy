import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ imgkey: string }> }) {
  const paramsAwaited = await params;
  const imgResponse = await fetch(`https://utfs.io/a/co6j4hk884/${paramsAwaited.imgkey}`);
  
  if (!imgResponse.ok) {
    return new NextResponse('Image not found', { status: 404 });
  }

  const contentType = imgResponse.headers.get("content-type") || "application/octet-stream";
  const imgBuffer = await imgResponse.arrayBuffer();

  return new NextResponse(imgBuffer, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': 'inline', // Use 'attachment' to force download
      'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
    },
  });
}
