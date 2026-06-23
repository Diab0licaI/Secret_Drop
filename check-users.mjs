import mongoose from 'mongoose';

async function main() {
  await mongoose.connect('mongodb://localhost:27017/secretdrop');
  const db = mongoose.connection.db;
  const users = await db.collection('users').find({}, { projection: { username: 1, email: 1, isVerified: 1, verifyCode: 1 } }).toArray();
  console.log(JSON.stringify(users, null, 2));
  await mongoose.disconnect();
}

main();