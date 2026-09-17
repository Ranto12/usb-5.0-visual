import { google } from 'googleapis';
import { SERVICES } from './bookingConfig';
import { getBookingSettings } from './content';

export { SERVICES };

// Header kolom Google Sheet
export const SHEET_HEADERS = [
  'ID',
  'Tanggal',
  'Jam Mulai',
  'Jam Selesai',
  'Nama',
  'WhatsApp',
  'Email',
  'Layanan',
  'Catatan',
  'Status',
  'Dibuat Pada',
];

// ─── Auth ─────────────────────────────────────────────────────────────────────

function getAuth() {
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '')
    .replace(/\\n/g, '\n');

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

function getSheets() {
  return google.sheets({ version: 'v4', auth: getAuth() });
}

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = 'Sheet1';

// ─── Init sheet (buat header jika kosong) ─────────────────────────────────────

export async function initSheet() {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A1:K1`,
  });

  if (!res.data.values || res.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [SHEET_HEADERS] },
    });
  }
}

// ─── Get all bookings ─────────────────────────────────────────────────────────

export interface Booking {
  id: string;
  date: string;       // YYYY-MM-DD
  startTime: string;  // HH:00
  endTime: string;    // HH:00
  name: string;
  whatsapp: string;
  email: string;
  service: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'done';
  createdAt: string;
}

export async function getBookings(date?: string): Promise<Booking[]> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A2:K`,
  });

  const rows = res.data.values || [];
  const bookings: Booking[] = rows
    .filter((r) => r[0]) // skip empty rows
    .map((r) => ({
      id: r[0] || '',
      date: r[1] || '',
      startTime: r[2] || '',
      endTime: r[3] || '',
      name: r[4] || '',
      whatsapp: r[5] || '',
      email: r[6] || '',
      service: r[7] || '',
      notes: r[8] || '',
      status: (r[9] as Booking['status']) || 'pending',
      createdAt: r[10] || '',
    }));

  if (date) return bookings.filter((b) => b.date === date);
  return bookings;
}

// ─── Get booked slots for a date ─────────────────────────────────────────────

export async function getBookedSlots(date: string): Promise<string[]> {
  const bookings = await getBookings(date);
  return bookings
    .filter((b) => b.status !== 'cancelled')
    .map((b) => b.startTime);
}

// ─── Create booking ───────────────────────────────────────────────────────────

export interface CreateBookingInput {
  date: string;
  startTime: string;
  name: string;
  whatsapp: string;
  email: string;
  service: string;
  notes?: string;
}

export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  const config = await getBookingSettings();
  await initSheet();

  // Cek apakah slot masih tersedia
  const booked = await getBookedSlots(input.date);
  if (booked.includes(input.startTime)) {
    throw new Error('Slot ini sudah dibooking. Silakan pilih waktu lain.');
  }

  const id = `BK-${Date.now()}`;
  const startHour = parseInt(input.startTime.split(':')[0]);
  const endTime = `${String(startHour + config.slot_duration).padStart(2, '0')}:00`;
  const createdAt = new Date().toISOString();

  const row = [
    id,
    input.date,
    input.startTime,
    endTime,
    input.name,
    input.whatsapp,
    input.email,
    input.service,
    input.notes || '',
    'pending',
    createdAt,
  ];

  const sheets = getSheets();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A:K`,
    valueInputOption: 'RAW',
    requestBody: { values: [row] },
  });

  return {
    id,
    date: input.date,
    startTime: input.startTime,
    endTime,
    name: input.name,
    whatsapp: input.whatsapp,
    email: input.email,
    service: input.service,
    notes: input.notes || '',
    status: 'pending',
    createdAt,
  };
}

// ─── Generate available time slots for a date ────────────────────────────────

export function generateTimeSlots(date: string, bookedSlots: string[], config: any) {
  const { start_hour: START_HOUR, end_hour: END_HOUR, slot_duration: SLOT_DURATION, closed_days: CLOSED_DAYS } = config;

  // Parse date parts langsung supaya tidak terpengaruh timezone server
  const [year, month, day] = date.split('-').map(Number);
  const dayOfWeek = new Date(year, month - 1, day).getDay();

  if (CLOSED_DAYS.map(Number).includes(dayOfWeek)) return null; // null = tutup, beda dari [] = error

  const slots = [];
  for (let h = START_HOUR; h < END_HOUR; h += SLOT_DURATION) {
    const time = `${String(h).padStart(2, '0')}:00`;
    const endH = h + SLOT_DURATION;
    const endTime = `${String(endH).padStart(2, '0')}:00`;
    slots.push({
      time,
      endTime,
      available: !bookedSlots.includes(time),
    });
  }
  return slots;
}
