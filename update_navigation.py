import re

with open('keystatic.config.ts', 'r') as f:
    content = f.read()

new_nav = """    navigation: {
      '⚙️ Pengaturan Global': ['siteSettings', 'bookingSettings', 'contact'],
      '🏠 Halaman Utama': ['hero', 'about'],
      '💼 Layanan & Harga': ['services', 'pricingCategories'],
      '🖼️ Portofolio & Ulasan': ['portfolio', 'testimonials'],
    },"""

content = re.sub(
    r"    navigation: \{\n      'Konten Utama': \['hero', 'about', 'contact', 'siteSettings', 'bookingSettings'\],\n      'Koleksi': \['services', 'portfolio', 'pricingCategories', 'testimonials'\],\n    \},",
    new_nav,
    content
)

with open('keystatic.config.ts', 'w') as f:
    f.write(content)
