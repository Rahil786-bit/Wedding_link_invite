import { NextRequest, NextResponse } from 'next/server';
import { approveWish, rejectWish } from '@/lib/server/wishes.service';
import { getSession } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { status } = await request.json();

    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    let wish;
    if (status === 'approved') {
      wish = await approveWish(id);
    } else {
      wish = await rejectWish(id);
    }

    if (!wish) {
      return NextResponse.json({ error: 'Wish not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, wish });
  } catch (error) {
    console.error('Error updating wish:', error);
    return NextResponse.json(
      { error: 'Failed to update wish' },
      { status: 500 }
    );
  }
}
