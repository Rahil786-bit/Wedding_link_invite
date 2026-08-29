import { NextRequest, NextResponse } from 'next/server';
import { createWish, getApprovedWishes } from '@/lib/server/wishes.service';
import { inviteConfig } from '@/lib/invite.config';

const MAX_REQUESTS_PER_MINUTE = 5;
const requestMap = new Map<string, number[]>();

function getRateLimitKey(ip: string): string {
  return `wishes:${ip}`;
}

function checkRateLimit(ip: string): boolean {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const requests = requestMap.get(key) || [];

  // Remove requests older than 1 minute
  const recentRequests = requests.filter((time) => now - time < 60000);

  if (recentRequests.length >= MAX_REQUESTS_PER_MINUTE) {
    return false;
  }

  recentRequests.push(now);
  requestMap.set(key, recentRequests);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { name, message } = await request.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    if (message.length > inviteConfig.wishes.maxMessageLength) {
      return NextResponse.json(
        { error: `Message exceeds maximum length of ${inviteConfig.wishes.maxMessageLength} characters` },
        { status: 400 }
      );
    }

    const wish = await createWish(
      name,
      message,
      inviteConfig.wishes.requireApproval
    );

    return NextResponse.json({
      success: true,
      wish,
      instant: !inviteConfig.wishes.requireApproval,
    });
  } catch (error) {
    console.error('Error creating wish:', error);
    return NextResponse.json(
      { error: 'Failed to submit wish' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'approved';

    if (status !== 'approved') {
      return NextResponse.json(
        { error: 'Only approved wishes are publicly visible' },
        { status: 400 }
      );
    }

    const wishes = await getApprovedWishes(inviteConfig.wishes.displayLimit);

    return NextResponse.json({ wishes });
  } catch (error) {
    console.error('Error fetching wishes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wishes' },
      { status: 500 }
    );
  }
}
