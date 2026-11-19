import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId');

    const products = await prisma.product.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
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
    const body = await req.json();
    const { name, description, price, discountPrice, images, categoryId, isAvailable } = body;
    
    if (!name || !price || !categoryId) {
      return NextResponse.json({ message: "Name, price, and category are required" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || "",
        price: parseFloat(price),
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        images: Array.isArray(images) ? images : (images ? [images] : []),
        categoryId,
        isAvailable: isAvailable !== undefined ? Boolean(isAvailable) : true,
      },
      include: { category: true }
    });

    revalidatePath('/', 'layout');
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to create product" }, { status: 500 });
  }
}
