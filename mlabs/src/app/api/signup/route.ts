// src/app/api/signup/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';

export async function POST(request: Request) {
  await dbConnect();
  const { username, email, password } = await request.json();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = await User.create({ username, email, password: hashedPassword });

  return NextResponse.json({ message: 'User created successfully', user: newUser });
}
