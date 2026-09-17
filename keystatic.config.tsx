import { config, fields, collection, singleton } from '@keystatic/core';

import React from 'react';

export default config({
  storage: {
    kind: 'local',
  },

  ui: {
    brand: {
      name: 'USB-5.0',
      mark: () => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: '#dc2626' }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>USB-5.0 VISUALS</span>
          </div>
        );
      },
    },
    navigation: {
      '⚙️ Pengaturan Global': ['siteSettings', 'bookingSettings', 'contact'],
      '🏠 Halaman Utama': ['hero', 'about'],
      '💼 Layanan & Harga': ['services', 'pricingCategories'],
      '🖼️ Portofolio & Ulasan': ['portfolio', 'testimonials'],
    },
  },

  singletons: {
    bookingSettings: singleton({
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

    hero: singleton({
      label: '🏠 Hero — Halaman Utama',
      path: 'src/content/hero/index',
      format: { data: 'json' },
      schema: {
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
      },
    }),

    about: singleton({
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

  },

  collections: {

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

    pricingCategories: collection({
      label: '💰 Daftar Harga (Pricing)',
      path: 'src/content/pricing/*',
      slugField: 'slug',
      format: { data: 'json' },
      schema: {
        slug: fields.slug({ name: { label: 'Slug / ID Unik' } }),
        order: fields.integer({
          label: 'Urutan Tab (Tab Order)',
          description: 'Urutan tab harga. Misal: 1 = paling kiri.',
          defaultValue: 1,
        }),
        icon: fields.text({
          label: 'Emoji Ikon',
          description: 'Emoji untuk tab. Misal: 🎓 📸 🎬 ✂️ 💻',
          defaultValue: '📸',
        }),
        name_id: fields.text({ label: 'Nama Kategori — Bahasa Indonesia' }),
        name_en: fields.text({ label: 'Category Name — English' }),
        packages: fields.array(
          fields.object({
            name: fields.text({ label: 'Nama Paket (Package Name)' }),
            price: fields.text({
              label: 'Harga (Price)',
              description: 'Misal: Rp 350.000 atau Hubungi Kami',
            }),
            unit_id: fields.text({
              label: 'Satuan — Bahasa Indonesia',
              description: 'Misal: / sesi, / foto, / menit. Kosongkan jika tidak ada.',
            }),
            unit_en: fields.text({
              label: 'Unit — English',
              description: 'e.g. / session, / photo, / minute. Leave empty if none.',
            }),
            popular: fields.checkbox({
              label: 'Tandai sebagai Terpopuler (Most Popular)',
              defaultValue: false,
            }),
            features_id: fields.text({
              label: 'Fitur Paket — Bahasa Indonesia (satu fitur per baris)',
              multiline: true,
              description: 'Tulis satu fitur per baris. Misal:\n1 Jam Sesi Foto\n30 Foto Edited',
            }),
            features_en: fields.text({
              label: 'Package Features — English (one per line)',
              multiline: true,
              description: 'One feature per line. e.g.\n1 Hour Photo Session\n30 Edited Photos',
            }),
          }),
          {
            label: 'Daftar Paket (Packages)',
            itemLabel: (props) => `${props.fields.name.value || 'Paket'} — ${props.fields.price.value || 'belum diisi'}`,
          }
        ),
      },
    }),

    testimonials: collection({
      label: '⭐ Testimoni (Testimonials)',
      path: 'src/content/testimonials/*',
      slugField: 'slug',
      format: { data: 'json' },
      schema: {
        slug: fields.slug({ name: { label: 'Slug / ID Unik' } }),
        name: fields.text({ label: 'Nama Klien (Client Name)' }),
        role: fields.text({
          label: 'Jabatan / Perusahaan (Role / Company)',
          description: 'Misal: Mahasiswa UI, CEO PT. ABC',
        }),
        avatar_url: fields.text({
          label: 'URL Foto Profil (Avatar URL)',
          description: 'URL foto klien. Kosongkan untuk pakai avatar default.',
        }),
        rating: fields.integer({
          label: 'Rating Bintang (1–5)',
          defaultValue: 5,
        }),
        text_id: fields.text({
          label: 'Isi Testimoni — Bahasa Indonesia',
          multiline: true,
        }),
        text_en: fields.text({
          label: 'Testimonial Text — English',
          multiline: true,
        }),
        service: fields.text({
          label: 'Layanan yang Digunakan (Service Used)',
          description: 'Misal: Fotografi Wisuda, Videografi Sinematik',
        }),
        order: fields.integer({
          label: 'Urutan Tampil (Display Order)',
          defaultValue: 1,
        }),
      },
    }),
  },
});
