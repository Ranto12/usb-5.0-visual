import { NextRequest, NextResponse } from 'next/server';
import { createBooking } from '@/lib/googleSheets';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, startTime, name, whatsapp, email, service, notes } = body;

    // Validasi input
    if (!date || !startTime || !name || !whatsapp || !service) {
      return NextResponse.json(
        { error: 'Field wajib: date, startTime, name, whatsapp, service' },
        { status: 400 }
      );
    }

    // Sanitasi nomor WA
    const cleanWA = whatsapp.replace(/\D/g, '');
    if (cleanWA.length < 9 || cleanWA.length > 15) {
      return NextResponse.json({ error: 'Nomor WhatsApp tidak valid' }, { status: 400 });
    }

    const booking = await createBooking({
      date,
      startTime,
      name: name.trim(),
      whatsapp: cleanWA,
      email: email?.trim() || '',
      service,
      notes: notes?.trim() || '',
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
    if (message.includes('sudah dibooking')) {
      return NextResponse.json({ error: message }, { status: 409 });
    }
    console.error('Error creating booking:', err);
    return NextResponse.json({ error: 'Gagal membuat booking' }, { status: 500 });
  }
}
