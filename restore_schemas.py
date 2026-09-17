import re

with open('keystatic.config.tsx', 'r') as f:
    content = f.read()

# I will replace from `about: singleton({` all the way to `pricingCategories: collection({`
new_schemas = """    about: singleton({
      label: '👥 Tentang Kami (About)',
      path: 'src/content/about/index',
      format: { data: 'json' },
      schema: {
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
        image_file: fields.image({
          label: '1. Upload Foto Tim (Lokal)',
          directory: 'public/images/about',
          publicPath: '/images/about',
        }),
        image_url: fields.text({
          label: '2. Atau gunakan Link URL (Eksternal)',
        }),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: 'Angka / Nilai' }),
            label_id: fields.text({ label: 'Label (ID)' }),
            label_en: fields.text({ label: 'Label (EN)' }),
          }),
          { label: 'Statistik', itemLabel: props => `${props.fields.value.value} ${props.fields.label_id.value}` }
        ),
      },
    }),

    contact: singleton({
      label: '📬 Informasi Kontak (Contact Info)',
      path: 'src/content/contact/index',
      format: { data: 'json' },
      schema: {
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
      },
    }),

    siteSettings: singleton({
      label: '⚙️ Pengaturan Website (Site Settings)',
      path: 'src/content/settings/index',
      format: { data: 'json' },
      schema: {
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
      },
    }),

    portfolio: collection({
      label: '🖼️ Portofolio (Portfolio)',
      path: 'src/content/portfolio/*',
      slugField: 'slug',
      format: { data: 'json' },
      schema: {
        slug: fields.slug({ name: { label: 'Slug / ID Unik' } }),
        title: fields.text({ label: 'Judul Karya (Title)' }),
        subtitle: fields.text({
          label: 'Subjudul / Kategori Karya (Subtitle)',
          description: 'Misal: Graduation Photography, Cinematic Videography',
        }),
        category: fields.select({
          label: 'Kategori (Category)',
          options: [
            { label: '📷 Fotografi (Photography)', value: 'photo' },
            { label: '🎬 Videografi (Videography)', value: 'video' },
            { label: '💻 Web Development', value: 'web' },
          ],
          defaultValue: 'photo',
        }),
        image_file: fields.image({
          label: '1. Upload Gambar (Lokal)',
          description: 'Prioritas: Upload gambar dari komputer Anda.',
          directory: 'public/images/portfolio',
          publicPath: '/images/portfolio',
        }),
        image_url: fields.text({
          label: '2. Atau gunakan Link URL (Eksternal)',
          description: 'Alternatif: Paste link gambar. (Jika ada Upload Gambar di atas, link ini diabaikan).',
        }),
        image_width: fields.integer({
          label: 'Lebar Gambar dalam piksel (Width px)',
          defaultValue: 600,
        }),
        image_height: fields.integer({
          label: 'Tinggi Gambar dalam piksel (Height px)',
          defaultValue: 800,
        }),
        link_url: fields.text({
          label: 'Link Eksternal (opsional)',
          description: 'URL ke YouTube, Instagram, website project, dll. Kosongkan jika tidak ada.',
        }),
        link_label: fields.text({
          label: 'Label Tombol Link (opsional)',
          description: 'Teks tombol link. Misal: Tonton Video, Kunjungi Website.',
          defaultValue: 'Lihat Project',
        }),
        order: fields.integer({
          label: 'Urutan Tampil (Display Order)',
          defaultValue: 1,
        }),
        featured: fields.checkbox({
          label: 'Tampilkan Pertama (Featured)',
          description: 'Centang untuk menampilkan karya ini di urutan paling atas.',
          defaultValue: false,
        }),
      },
    }),

    pricingCategories: collection({"""

content = re.sub(r"    about: singleton\(\{.*?pricingCategories: collection\(\{", new_schemas, content, flags=re.DOTALL)

with open('keystatic.config.tsx', 'w') as f:
    f.write(content)
