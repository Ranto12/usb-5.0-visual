import re

with open('keystatic.config.ts', 'r') as f:
    content = f.read()

booking_singleton = """    bookingSettings: singleton({
      label: '📅 Pengaturan Booking',
      path: 'src/content/booking/index',
      format: { data: 'json' },
      schema: {
        start_hour: fields.integer({ label: 'Jam Buka (mulai)', defaultValue: 8, description: 'Gunakan format 24 jam. Misal: 8 untuk 08:00' }),
        end_hour: fields.integer({ label: 'Jam Tutup (selesai)', defaultValue: 20, description: 'Gunakan format 24 jam. Misal: 20 untuk 20:00' }),
        slot_duration: fields.integer({ label: 'Durasi per Sesi (Jam)', defaultValue: 1 }),
        max_days_ahead: fields.integer({ label: 'Maksimal Hari ke Depan (Booking window)', defaultValue: 30 }),
        closed_days: fields.multiselect({
          label: 'Hari Libur / Tutup',
          options: [
            { label: 'Minggu', value: '0' },
            { label: 'Senin', value: '1' },
            { label: 'Selasa', value: '2' },
            { label: 'Rabu', value: '3' },
            { label: 'Kamis', value: '4' },
            { label: 'Jumat', value: '5' },
            { label: 'Sabtu', value: '6' },
          ],
          defaultValue: ['0'],
        }),
      },
    }),
"""

content = content.replace("  singletons: {", "  singletons: {\n" + booking_singleton)

content = content.replace(
    "'Konten Utama': ['hero', 'about', 'contact', 'siteSettings'],",
    "'Konten Utama': ['hero', 'about', 'contact', 'siteSettings', 'bookingSettings'],"
)

with open('keystatic.config.ts', 'w') as f:
    f.write(content)
