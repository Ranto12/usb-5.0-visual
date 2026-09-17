import re

with open('src/lib/googleSheets.ts', 'r') as f:
    content = f.read()

# Replace import
content = content.replace(
    "import { BOOKING_CONFIG, SERVICES } from './bookingConfig';",
    "import { SERVICES } from './bookingConfig';\nimport { getBookingSettings } from './content';"
)

content = content.replace("export { BOOKING_CONFIG, SERVICES };", "export { SERVICES };")

# Fix generateTimeSlots
generate_slots_new = """export function generateTimeSlots(date: string, bookedSlots: string[], config: any) {
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
}"""

content = re.sub(
    r"export function generateTimeSlots\(date: string, bookedSlots: string\[\]\).*?return slots;\n}",
    generate_slots_new,
    content,
    flags=re.DOTALL
)

# Fix createBooking
create_booking_new = """export async function createBooking(input: CreateBookingInput): Promise<Booking> {
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
  const createdAt = new Date().toISOString();"""

content = re.sub(
    r"export async function createBooking\(input: CreateBookingInput\): Promise<Booking> \{.*?const createdAt = new Date\(\)\.toISOString\(\);",
    create_booking_new,
    content,
    flags=re.DOTALL
)

with open('src/lib/googleSheets.ts', 'w') as f:
    f.write(content)
