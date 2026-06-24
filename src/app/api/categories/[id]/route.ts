import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/react";
import { authOptions } from "@/lib/auth";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  
  // @ts-ignore
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = params;
    
    await prisma.category.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete category. Ensure it has no products." }, { status: 500 });
  }
}
