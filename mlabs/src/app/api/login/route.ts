// src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  console.log('Request Body:', body); // Log the whole request body

  const { email, password } = body;
  console.log('email:', email);
  console.log('password:', password); // Log password for further debugging

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
  }

  return NextResponse.json({ message: 'Login successful', user });
}

