import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // @ts-ignore
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized. You must be logged in to place an order.' }, { status: 401 });
    }

    const body = await req.json();
    const { items, customerInfo, subtotal, deliveryFee, totalAmount } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      return NextResponse.json({ error: 'Missing required customer details' }, { status: 400 });
    }

    // @ts-ignore
    const userId = session.user.id;

    // Create the order and associated order items in a transaction
    const order = await prisma.order.create({
      data: {
        userId: userId,
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

    // Send Notification Email to Admin
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || 'thefurniturestoreug@gmail.com',
          pass: process.env.EMAIL_PASSWORD || ''
        }
      });

      const itemsList = items.map((i: any) => `${i.quantity}x ${i.name} (Ugx ${i.price.toLocaleString()})`).join('\n');
      
      const mailOptions = {
        from: process.env.EMAIL_USER || 'thefurniturestoreug@gmail.com',
        to: 'thefurniturestoreug@gmail.com',
        subject: `New Order Received - ${order.id}`,
        text: `A new order has been placed!\n\nOrder ID: ${order.id}\nCustomer: ${customerInfo.name}\nPhone: ${customerInfo.phone}\nEmail: ${customerInfo.email || 'N/A'}\nAddress: ${customerInfo.address}\n\nItems:\n${itemsList}\n\nSubtotal: Ugx ${subtotal.toLocaleString()}\nDelivery: Ugx ${deliveryFee.toLocaleString()}\nTotal: Ugx ${totalAmount.toLocaleString()}\n\nNotes: ${customerInfo.notes || 'None'}\n\nPlease check the Admin Dashboard to process this order.`
      };

      if (process.env.EMAIL_PASSWORD) {
        await transporter.sendMail(mailOptions);
      } else {
        console.warn("EMAIL_PASSWORD is not set in .env. Admin email notification was NOT sent. The order was still created.");
      }
    } catch (emailError) {
      console.error('Failed to send admin email notification:', emailError);
      // We don't want to fail the order if the email fails, so we catch and log it.
    }

    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
