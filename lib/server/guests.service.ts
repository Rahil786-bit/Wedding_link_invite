import { connectDB } from '@/lib/db';
import { Guest } from '@/lib/models';
import crypto from 'crypto';

export async function createOrUpdateGuest(name: string, eventKeys: string[]) {
  await connectDB();

  // Generate slug: {Name}-{shortHash}
  const shortHash = crypto.randomBytes(6).toString('hex');
  const slug = `${name.replace(/\s+/g, '-')}-${shortHash}`;

  const guest = await Guest.findOneAndUpdate(
    { slug },
    {
      name,
      eventKeys,
    },
    { upsert: true, new: true }
  );

  return guest;
}

export async function getGuestBySlug(slug: string) {
  await connectDB();

  const guest = await Guest.findOne({ slug });

  if (!guest) {
    throw new Error('Guest not found');
  }

  return guest;
}

export async function getAllGuests() {
  await connectDB();

  const guests = await Guest.find({}).sort({ createdAt: -1 });

  return guests;
}

export async function deleteGuest(id: string) {
  await connectDB();

  const guest = await Guest.findByIdAndDelete(id);

  return guest;
}

export async function updateGuestEventKeys(id: string, eventKeys: string[]) {
  await connectDB();

  const guest = await Guest.findByIdAndUpdate(id, { eventKeys }, { new: true });

  return guest;
}
