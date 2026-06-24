import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  
  // @ts-ignore
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await params;
    
    await prisma.slide.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Slide deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete slide" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  
  // @ts-ignore
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    
    // Only update imageData if a new one was provided
    const updateData: any = {
      title: body.title,
      subtitle: body.subtitle,
      link: body.link
    };
    
    if (body.imageData) {
      updateData.imageData = body.imageData;
    }

    const updatedSlide = await prisma.slide.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(updatedSlide);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update slide" }, { status: 500 });
  }
}
