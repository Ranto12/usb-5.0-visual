import re

with open('src/components/Booking.tsx', 'r') as f:
    content = f.read()

# Replace import
content = content.replace("import { BOOKING_CONFIG, SERVICES } from '@/lib/bookingConfig';", "import { SERVICES } from '@/lib/bookingConfig';")

# Add props
content = content.replace("export default function Booking() {", "export default function Booking({ bookingSettings }: { bookingSettings: any }) {")

# Replace BOOKING_CONFIG usages
content = content.replace("BOOKING_CONFIG.MAX_DAYS_AHEAD", "bookingSettings.max_days_ahead")
content = content.replace("BOOKING_CONFIG.CLOSED_DAYS", "bookingSettings.closed_days.map(Number)")

with open('src/components/Booking.tsx', 'w') as f:
    f.write(content)
