import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string; name?: string };

  const email = body.email?.trim().toLowerCase();
  const password = body.password;

  if (!email || !password || password.length < 12) {
    return NextResponse.json(
      { error: "Email and a password of at least 12 characters are required." },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name: body.name?.trim() || null,
      password: passwordHash,
      status: "active",
      createdBy: "self-signup"
    }
  });

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}
