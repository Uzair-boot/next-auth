import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectDB();

  const hashed = await bcrypt.hash(password, 10);
  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ error: "User exists" }, { status: 400 });

  await User.create({ email, password: hashed });
  return NextResponse.json({ message: "Registered" });
}
