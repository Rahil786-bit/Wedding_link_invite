import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateGuest, getAllGuests, deleteGuest } from '@/lib/server/guests.service';
import { getSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, eventKeys } = await request.json();

    if (!name || !eventKeys || !Array.isArray(eventKeys)) {
      return NextResponse.json(
        { error: 'Name and event keys are required' },
        { status: 400 }
      );
    }

    const guest = await createOrUpdateGuest(name, eventKeys);
    const inviteUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/invite/${guest.slug}`;

    return NextResponse.json({
      success: true,
      guest,
      slug: guest.slug,
      inviteUrl,
    });
  } catch (error) {
    console.error('Error creating guest:', error);
    return NextResponse.json(
      { error: 'Failed to create guest' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const guests = await getAllGuests();

    return NextResponse.json({ guests });
  } catch (error) {
    console.error('Error fetching guests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch guests' },
      { status: 500 }
    );
  }
}
