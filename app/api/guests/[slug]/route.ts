import { NextResponse } from 'next/server';
import { getGuestBySlug } from '@/lib/server/guests.service';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const guest = await getGuestBySlug(slug);

    // Update viewed timestamp
    guest.viewedAt = new Date();
    await guest.save();

    return NextResponse.json({
      name: guest.name,
      eventKeys: guest.eventKeys,
    });
  } catch (error) {
    console.error('Error fetching guest:', error);
    return NextResponse.json(
      { error: 'Guest not found' },
      { status: 404 }
    );
  }
}
