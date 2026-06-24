import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  
  // @ts-ignore
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const { author, role, content, rating } = await req.json();
    
    if (!author || !content) {
      return NextResponse.json({ message: "Author and content are required" }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: { author, role, content, rating: Number(rating) }
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to create testimonial" }, { status: 500 });
  }
}
