import { NextRequest, NextResponse } from 'next/server';
import { getBookedSlots, generateTimeSlots } from '@/lib/googleSheets';
import { getBookingSettings } from '@/lib/content';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const bookingConfig = await getBookingSettings();

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Parameter date (YYYY-MM-DD) diperlukan' }, { status: 400 });
  }

  // Validasi tidak di masa lalu
  const [y, m, d] = date.split('-').map(Number);
  const selected = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selected < today) {
    return NextResponse.json({ error: 'Tidak bisa booking tanggal yang sudah lewat' }, { status: 400 });
  }

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + bookingConfig.max_days_ahead);
  if (selected > maxDate) {
    return NextResponse.json(
      { error: `Booking maksimal ${bookingConfig.max_days_ahead} hari ke depan` },
      { status: 400 }
    );
  }

  try {
    const booked = await getBookedSlots(date);
    const slots = generateTimeSlots(date, booked, bookingConfig);

    // null = hari tutup, array = slot tersedia
    if (slots === null) {
      return NextResponse.json({ date, slots: [], booked: [], closed: true });
    }

    return NextResponse.json({ date, slots, booked, closed: false });
  } catch (err) {
    console.error('Slots API error:', err);
    return NextResponse.json(
      { error: 'Gagal mengambil data slot. Pastikan Google Sheet sudah di-share ke service account.' },
      { status: 500 }
    );
  }
}
