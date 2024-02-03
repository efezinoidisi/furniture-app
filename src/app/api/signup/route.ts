import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
// import prisma from '@/lib/db';
import { z } from 'zod';

const SignUp = z.object({
  username: z.string(),
  password: z.string().length(8),
  image: z.string().nullable(),
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  const isValid = SignUp.safeParse(req.body);

  console.log(isValid);

  try {
    const { email, password, username, image } = await req.json();

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const userExists = true;

    if (userExists) {
      return NextResponse.json(
        { message: 'duplicate user found' },
        { status: 404 }
      );
    }

    const user = { name: 'test' };

    return NextResponse.json(
      { message: 'user created!', user },
      { status: 404 }
    );
  } catch (error) {
    NextResponse.json(
      { message: 'error occurred while registering the user' },
      { status: 404 }
    );
  }
}
