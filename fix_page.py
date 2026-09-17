import re

with open('src/app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "  getContactInfo,\n} from '@/lib/content';",
    "  getContactInfo,\n  getBookingSettings,\n} from '@/lib/content';"
)

content = content.replace(
    "const [services, portfolio, pricingCategories, heroData, aboutData, contactData] =",
    "const [services, portfolio, pricingCategories, heroData, aboutData, contactData, bookingSettings] ="
)

content = content.replace(
    "getContactInfo(),\n    ]);",
    "getContactInfo(),\n      getBookingSettings(),\n    ]);"
)

content = content.replace("<Booking />", "<Booking bookingSettings={bookingSettings} />")

with open('src/app/page.tsx', 'w') as f:
    f.write(content)
