import { connectDB } from '@/lib/db';
import { Wish } from '@/lib/models';

export async function createWish(name: string, message: string, requireApproval: boolean) {
  await connectDB();

  const wish = new Wish({
    name,
    message,
    status: requireApproval ? 'pending' : 'approved',
  });

  await wish.save();

  return wish;
}

export async function getApprovedWishes(limit: number) {
  await connectDB();

  const wishes = await Wish.find({ status: 'approved' })
    .sort({ approvedAt: -1, createdAt: -1 })
    .limit(limit);

  return wishes;
}

export async function getWishesByStatus(status: 'pending' | 'approved' | 'rejected') {
  await connectDB();

  const wishes = await Wish.find({ status }).sort({ createdAt: -1 });

  return wishes;
}

export async function approveWish(id: string) {
  await connectDB();

  const wish = await Wish.findByIdAndUpdate(
    id,
    { status: 'approved', approvedAt: new Date() },
    { new: true }
  );

  return wish;
}

export async function rejectWish(id: string) {
  await connectDB();

  const wish = await Wish.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });

  return wish;
}

export async function deleteWish(id: string) {
  await connectDB();

  const wish = await Wish.findByIdAndDelete(id);

  return wish;
}

export async function getWishStats() {
  await connectDB();

  const pending = await Wish.countDocuments({ status: 'pending' });
  const approved = await Wish.countDocuments({ status: 'approved' });
  const rejected = await Wish.countDocuments({ status: 'rejected' });

  return { pending, approved, rejected };
}
