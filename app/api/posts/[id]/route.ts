import { connectDB } from "../../../../lib/mongodb";
import Post from "../../../../models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content } = await req.json();
  await connectDB();

  const post = await Post.findOne({ _id: params.id });

  if (!post || post.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden or not found" }, { status: 403 });
  }

  post.title = title;
  post.content = content;
  await post.save();

  return NextResponse.json(post);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const post = await Post.findOne({ _id: params.id });

  if (!post || post.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden or not found" }, { status: 403 });
  }

  await post.deleteOne();

  return NextResponse.json({ message: "Deleted" });
}
