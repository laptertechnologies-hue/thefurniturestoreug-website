import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, customerInfo, subtotal, deliveryFee, totalAmount } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      return NextResponse.json({ error: 'Missing required customer details' }, { status: 400 });
    }

    // Create the order and associated order items in a transaction
    const order = await prisma.order.create({
      data: {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email || null,
        customerPhone: customerInfo.phone,
        customerAddress: customerInfo.address,
        totalAmount: totalAmount,
        status: 'PENDING',
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        orderItems: true
      }
    });

    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
