import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const maxDuration = 60; // Allow 60s for base64 uploads

export async function GET() {
  try {
    const slides = await prisma.slide.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(slides);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch slides" }, { status: 500 });
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
    const { imageData, title, subtitle, link } = await req.json();
    
    if (!imageData) {
      return NextResponse.json({ message: "Image is required" }, { status: 400 });
    }

    const slide = await prisma.slide.create({
      data: { imageData, title, subtitle, link }
    });

    return NextResponse.json(slide, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to create slide" }, { status: 500 });
  }
}
