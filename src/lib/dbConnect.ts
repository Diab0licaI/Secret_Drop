import { setDefaultResultOrder } from 'dns';
setDefaultResultOrder('ipv4first');

import mongoose from 'mongoose';

const cached = global as typeof global & {
  mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
};

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.mongoose!.conn) {
    console.log('Already connected to the database');
    return cached.mongoose!.conn;
  }

  if (!cached.mongoose!.promise) {
    cached.mongoose!.promise = mongoose.connect(process.env.MONGODB_URI!, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });
  }

  try {
    cached.mongoose!.conn = await cached.mongoose!.promise;
    console.log('Database connected successfully');
  } catch (error) {
    cached.mongoose!.promise = null; // reset so next call retries
    console.error('Database connection failed:', error);
    throw error; // don't exit the process, let the route handler deal with it
  }

  return cached.mongoose!.conn;
}

export default dbConnect;