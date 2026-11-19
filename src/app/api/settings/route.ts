import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    if (key) {
      const setting = await prisma.siteSetting.findUnique({
        where: { key }
      });
      return NextResponse.json({ value: setting?.value || null });
    }

    const settings = await prisma.siteSetting.findMany();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Support batch saving { settings: { key1: val1, key2: val2 } }
    if (body.settings && typeof body.settings === 'object') {
      const entries = Object.entries(body.settings as Record<string, string>);
      await Promise.all(
        entries.map(([k, v]) =>
          prisma.siteSetting.upsert({
            where: { key: k },
            update: { value: String(v ?? '') },
            create: { key: k, value: String(v ?? '') }
          })
        )
      );
      revalidatePath('/', 'layout');
      return NextResponse.json({ ok: true, count: entries.length });
    }

    const { key, value } = body;
    if (!key || value === undefined) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) }
    });

    revalidatePath('/', 'layout');
    return NextResponse.json(setting);
  } catch (error) {
    console.error('Failed to save setting:', error);
    return NextResponse.json({ error: 'Failed to save setting' }, { status: 500 });
  }
}
