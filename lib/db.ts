import mongoose from 'mongoose';

function getMongoUri(): string {
  const value = process.env.MONGODB_URI;
  if (!value) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }
  return value;
}

const uri = getMongoUri();

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cached: MongooseCache = globalWithMongoose.mongoose ?? { conn: null, promise: null };
globalWithMongoose.mongoose = cached;

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { bufferCommands: false }).then((instance) => instance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
