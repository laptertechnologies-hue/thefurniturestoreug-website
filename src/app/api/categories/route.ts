import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 });
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
    const { name, description } = await req.json();
    
    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: { name, description }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ message: "Category with this name already exists" }, { status: 400 });
    }
    return NextResponse.json({ message: "Failed to create category" }, { status: 500 });
  }
}
