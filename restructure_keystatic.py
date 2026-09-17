import re

with open('keystatic.config.tsx', 'r') as f:
    content = f.read()

hero_schema = """      schema: {
        tagline: fields.object({
          id: fields.text({ label: 'Bahasa Indonesia', multiline: true }),
          en: fields.text({ label: 'English', multiline: true }),
        }, { label: 'Tagline (Judul Utama)', description: 'Teks paling besar di halaman depan' }),
        subtitle: fields.object({
          id: fields.text({ label: 'Bahasa Indonesia', multiline: true }),
          en: fields.text({ label: 'English', multiline: true }),
        }, { label: 'Subjudul', description: 'Teks kecil di bawah tagline' }),
        stats: fields.array(
          fields.object({
            val: fields.text({ label: 'Angka (misal: 200+)' }),
            label: fields.text({ label: 'Label (misal: Happy Clients)' })
          }),
          { label: 'Statistik', itemLabel: props => `${props.fields.val.value} ${props.fields.label.value}` }
        )
      },"""

content = re.sub(r"      schema: \{\n        tagline_id: fields\.text\(\{.*?stat3_label: fields\.text\(\{.*?\n      \},", hero_schema, content, flags=re.DOTALL)

about_schema = """      schema: {
        title: fields.object({
          id: fields.text({ label: 'Bahasa Indonesia' }),
          en: fields.text({ label: 'English' })
        }, { label: 'Judul Utama' }),
        subtitle: fields.object({
          id: fields.text({ label: 'Bahasa Indonesia' }),
          en: fields.text({ label: 'English' })
        }, { label: 'Subjudul' }),
        description1: fields.object({
          id: fields.text({ label: 'Bahasa Indonesia', multiline: true }),
          en: fields.text({ label: 'English', multiline: true })
        }, { label: 'Paragraf Pertama' }),
        description2: fields.object({
          id: fields.text({ label: 'Bahasa Indonesia', multiline: true }),
          en: fields.text({ label: 'English', multiline: true })
        }, { label: 'Paragraf Kedua' }),
        image_url: fields.image({
          label: 'Foto Tim (Team Photo)',
          description: 'Upload foto tim atau studio',
          directory: 'public/images/about',
          publicPath: '/images/about',
        }),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: 'Angka / Nilai' }),
            label_id: fields.text({ label: 'Label (ID)' }),
            label_en: fields.text({ label: 'Label (EN)' }),
          }),
          { label: 'Statistik', itemLabel: props => `${props.fields.value.value} ${props.fields.label_id.value}` }
        ),
      },"""

content = re.sub(r"      schema: \{\n        title_id: fields\.text\(\{.*?image_url: fields\.image\(\{.*?\),.*?stats: fields\.array\(.*?\n        \),\n      \},", about_schema, content, flags=re.DOTALL)

contact_schema = """      schema: {
        socials: fields.object({
          whatsapp: fields.text({ label: 'WhatsApp', description: 'Contoh: 6285840385667' }),
          instagram: fields.text({ label: 'Handle IG', description: 'Contoh: @usb.visuals' }),
          instagram_url: fields.text({ label: 'URL IG' }),
          youtube_url: fields.text({ label: 'URL YouTube' }),
          tiktok_url: fields.text({ label: 'URL TikTok' }),
        }, { label: 'Media Sosial & Kontak' }),
        location: fields.object({
          id: fields.text({ label: 'Bahasa Indonesia' }),
          en: fields.text({ label: 'English' })
        }, { label: 'Lokasi' }),
        available: fields.object({
          id: fields.text({ label: 'Bahasa Indonesia' }),
          en: fields.text({ label: 'English' })
        }, { label: 'Jam Operasional' }),
      },"""

content = re.sub(r"      schema: \{\n        whatsapp: fields\.text\(\{.*?available_en: fields\.text\(\{.*?\n      \},", contact_schema, content, flags=re.DOTALL)

settings_schema = """      schema: {
        site_title: fields.text({ label: 'Judul Website (SEO)' }),
        site_description: fields.object({
          id: fields.text({ label: 'Deskripsi (ID)', multiline: true }),
          en: fields.text({ label: 'Deskripsi (EN)', multiline: true })
        }, { label: 'Deskripsi Website' }),
        og_image: fields.image({
          label: 'Gambar OG (Open Graph Image)',
          description: 'Upload gambar untuk thumbnail saat link dibagikan (sosmed).',
          directory: 'public/images/settings',
          publicPath: '/images/settings',
        }),
        social_links: fields.object({
          youtube_url: fields.text({ label: 'URL YouTube' }),
          tiktok_url: fields.text({ label: 'URL TikTok' })
        }, { label: 'Tautan Sosial Ekstra' })
      },"""

content = re.sub(r"      schema: \{\n        site_title: fields\.text\(\{.*?tiktok_url: fields\.text\(\{.*?\}\),\n      \},", settings_schema, content, flags=re.DOTALL)

with open('keystatic.config.tsx', 'w') as f:
    f.write(content)
