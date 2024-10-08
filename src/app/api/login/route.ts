
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  console.log('Request Body:', body); 

  const { email, password } = body;
  console.log('email:', email);
  console.log('password:', password); 

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

