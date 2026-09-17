import re

with open('src/app/api/bookings/slots/route.ts', 'r') as f:
    content = f.read()

content = content.replace(
    "import { getBookedSlots, generateTimeSlots, BOOKING_CONFIG } from '@/lib/googleSheets';",
    "import { getBookedSlots, generateTimeSlots } from '@/lib/googleSheets';\nimport { getBookingSettings } from '@/lib/content';"
)

# Fetch config
fetch_config = """  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const bookingConfig = await getBookingSettings();"""

content = content.replace(
    "  const { searchParams } = new URL(req.url);\n  const date = searchParams.get('date');",
    fetch_config
)

content = content.replace("BOOKING_CONFIG.MAX_DAYS_AHEAD", "bookingConfig.max_days_ahead")
content = content.replace("generateTimeSlots(date, booked)", "generateTimeSlots(date, booked, bookingConfig)")

with open('src/app/api/bookings/slots/route.ts', 'w') as f:
    f.write(content)
