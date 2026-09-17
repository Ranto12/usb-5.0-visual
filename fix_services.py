import re

with open('keystatic.config.tsx', 'r') as f:
    content = f.read()

services_schema = """
    services: collection({
      label: '💼 Layanan (Services)',
      path: 'src/content/services/*',
      slugField: 'slug',
      format: { data: 'json' },
      schema: {
        slug: fields.slug({ name: { label: 'Slug / ID Unik' } }),
        order: fields.integer({ label: 'Urutan Tampil', defaultValue: 1 }),
        tag: fields.text({ label: 'Tag Kecil (Kategori)' }),
        title_id: fields.text({ label: 'Judul — Bahasa Indonesia' }),
        title_en: fields.text({ label: 'Title — English' }),
        description_id: fields.text({ label: 'Deskripsi — Bahasa Indonesia', multiline: true }),
        description_en: fields.text({ label: 'Description — English', multiline: true }),
        icon: fields.text({ label: 'Ikon (misal: camera, video, laptop)', defaultValue: 'camera' }),
      }
    }),

    portfolio: collection({"""

content = re.sub(r"    portfolio: collection\(\{", services_schema, content)

with open('keystatic.config.tsx', 'w') as f:
    f.write(content)
