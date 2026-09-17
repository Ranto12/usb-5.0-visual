export type Language = 'id' | 'en';

export const translations = {
  id: {
    // Navbar
    nav: {
      home: 'Beranda',
      services: 'Layanan',
      portfolio: 'Portofolio',
      pricing: 'Harga',
      about: 'Tentang',
      contact: 'Kontak',
    },
    // Hero
    hero: {
      tagline: 'Abadikan Momen,\nCiptakan Karya',
      subtitle:
        'Kami menghadirkan layanan fotografi, videografi, dan pembuatan konten profesional dengan sentuhan sinematik yang memukau.',
      ctaPortfolio: 'Lihat Portofolio',
      ctaContact: 'Hubungi Kami',
      scrollDown: 'Scroll ke bawah',
    },
    // Services
    services: {
      title: 'Layanan Kami',
      subtitle: 'Solusi visual lengkap untuk setiap kebutuhan Anda',
      items: [
        {
          title: 'Fotografi Wisuda',
          description:
            'Abadikan momen wisuda terbaik Anda dengan foto profesional berkualitas tinggi. Kami memastikan setiap detail terekam sempurna.',
          tag: 'Graduation Photo',
        },
        {
          title: 'Fotografi Event',
          description:
            'Dokumentasi acara perusahaan, pernikahan, dan event lainnya dengan hasil foto yang memukau dan bercerita.',
          tag: 'Event Photo',
        },
        {
          title: 'Videografi Sinematik',
          description:
            'Produksi video sinematik berkualitas tinggi dengan editing profesional yang menghadirkan nuansa film layar lebar.',
          tag: 'Cinematic Video',
        },
        {
          title: 'Editing Video & Foto',
          description:
            'Layanan post-production profesional untuk konten media sosial, reels, highlight, dan berbagai kebutuhan visual.',
          tag: 'Post Production',
        },
        {
          title: 'Web Development',
          description:
            'Jasa pembuatan website landing page, company profile, hingga full stack web app yang modern dan responsif.',
          tag: 'Web Dev',
        },
      ],
    },
    // Portfolio
    portfolio: {
      title: 'Portofolio',
      subtitle: 'Karya terbaik kami untuk klien yang puas',
      filterAll: 'Semua',
      filterPhoto: 'Fotografi',
      filterVideo: 'Videografi',
      filterWeb: 'Web',
      viewAll: 'Lihat Semua',
    },
    // Pricing
    pricing: {
      title: 'Daftar Harga',
      subtitle: 'Transparan, terjangkau, dan berkualitas',
      note: 'Hubungi kami untuk custom quote dan paket khusus',
      contactUs: 'Hubungi Kami',
      perSession: '/ sesi',
      perPhoto: '/ foto',
      perMinute: '/ menit',
      perVideo: '/ video',
      popular: 'Terpopuler',
      categories: [
        {
          name: 'Fotografi Wisuda',
          icon: '🎓',
          packages: [
            {
              name: 'Basic',
              price: 'Rp 350.000',
              unit: '/ sesi',
              features: ['1 Jam Sesi Foto', '30 Foto Edited', 'File Digital HD', 'Revisi 1x'],
            },
            {
              name: 'Standard',
              price: 'Rp 600.000',
              unit: '/ sesi',
              popular: true,
              features: ['2 Jam Sesi Foto', '60 Foto Edited', 'File Digital HD', 'Revisi 2x', 'Soft Copy Album'],
            },
            {
              name: 'Premium',
              price: 'Rp 1.000.000',
              unit: '/ sesi',
              features: [
                '3 Jam Sesi Foto',
                '100 Foto Edited',
                'File Digital HD',
                'Revisi 3x',
                'Cetak Album Fisik',
                'Free 1 Foto Kanvas',
              ],
            },
          ],
        },
        {
          name: 'Fotografi Event',
          icon: '📸',
          packages: [
            {
              name: 'Half Day',
              price: 'Rp 800.000',
              unit: '',
              features: ['4 Jam Dokumentasi', 'Semua Foto Edited', 'File Digital HD', 'Pengiriman 3 Hari'],
            },
            {
              name: 'Full Day',
              price: 'Rp 1.500.000',
              unit: '',
              popular: true,
              features: ['8 Jam Dokumentasi', 'Semua Foto Edited', 'File Digital HD', 'Pengiriman 3 Hari', '1 Fotografer'],
            },
            {
              name: 'Custom',
              price: 'Hubungi Kami',
              unit: '',
              features: ['Durasi Fleksibel', 'Multi Fotografer', 'Editing Premium', 'Paket Cetak', 'Konsultasi Gratis'],
            },
          ],
        },
        {
          name: 'Videografi Sinematik',
          icon: '🎬',
          packages: [
            {
              name: 'Short Film',
              price: 'Rp 1.500.000',
              unit: '',
              features: ['Durasi 1-3 Menit', 'Color Grading', 'Background Music', 'Revisi 1x'],
            },
            {
              name: 'Medium Film',
              price: 'Rp 2.500.000',
              unit: '',
              popular: true,
              features: ['Durasi 3-7 Menit', 'Color Grading Sinematik', 'Original Score', 'Revisi 2x', 'Drone Shot (opsional)'],
            },
            {
              name: 'Full Cinematic',
              price: 'Rp 4.000.000+',
              unit: '',
              features: ['Durasi 7+ Menit', 'Sinematik Full Production', 'Multi-Kamera', 'Revisi 3x', 'Drone Shot', 'Master File 4K'],
            },
          ],
        },
        {
          name: 'Editing Video & Foto',
          icon: '✂️',
          packages: [
            {
              name: 'Photo Edit',
              price: 'Rp 25.000',
              unit: '/ foto',
              features: ['Retouching Profesional', 'Color Grading', 'Background Edit', 'File HD'],
            },
            {
              name: 'Video Edit',
              price: 'Rp 150.000',
              unit: '/ menit',
              popular: true,
              features: ['Cutting & Assembly', 'Color Grading', 'Subtitle & Teks', 'Sound Design', 'Revisi 2x'],
            },
            {
              name: 'Reels / Short',
              price: 'Rp 200.000',
              unit: '/ video',
              features: ['Format Vertikal 9:16', 'Trending Transition', 'Caption & Stiker', 'BGM Trending', 'Revisi 1x'],
            },
          ],
        },
        {
          name: 'Web Development',
          icon: '💻',
          packages: [
            {
              name: 'Landing Page',
              price: 'Rp 1.500.000',
              unit: '',
              features: ['1 Halaman Responsif', 'Desain Modern', 'SEO Basic', 'Deploy Gratis'],
            },
            {
              name: 'Company Profile',
              price: 'Rp 3.000.000',
              unit: '',
              popular: true,
              features: ['5-10 Halaman', 'CMS Admin Panel', 'SEO Optimized', 'Domain + Hosting 1 Tahun', 'Mobile Responsive'],
            },
            {
              name: 'Full Stack App',
              price: 'Rp 7.000.000+',
              unit: '',
              features: ['Custom Features', 'Database Terintegrasi', 'Auth & Dashboard', 'API Integration', 'Support 3 Bulan'],
            },
          ],
        },
      ],
    },
    // About
    about: {
      title: 'Tentang Kami',
      subtitle: 'Visual yang berbicara lebih dari seribu kata',
      description1:
        'USB-5.0 VISUALS adalah studio kreatif yang berfokus pada fotografi, videografi, dan pembuatan konten visual berkualitas tinggi. Kami hadir untuk membantu individu, brand, dan perusahaan dalam menyampaikan pesan mereka melalui karya visual yang kuat dan berkesan.',
      description2:
        'Dengan pendekatan sinematik dan perhatian mendalam terhadap detail, setiap project kami kerjakan dengan penuh dedikasi. Dari momen wisuda yang tak terlupakan hingga kampanye brand yang impactful, kami siap mewujudkan visi Anda.',
      stats: [
        { value: '200+', label: 'Klien Puas' },
        { value: '500+', label: 'Project Selesai' },
        { value: '3+', label: 'Tahun Pengalaman' },
        { value: '5', label: 'Layanan Unggulan' },
      ],
      values: [
        { title: 'Kualitas Sinematik', description: 'Setiap frame dikerjakan dengan standar produksi sinematik tertinggi.' },
        { title: 'Tepat Waktu', description: 'Kami menghargai waktu Anda dan selalu menyelesaikan project sesuai jadwal.' },
        { title: 'Kreatif & Inovatif', description: 'Selalu menghadirkan ide segar dan pendekatan visual yang unik untuk setiap klien.' },
      ],
    },
    // Contact
    contact: {
      title: 'Hubungi Kami',
      subtitle: 'Siap membantu mewujudkan proyek impian Anda',
      waButton: 'Chat WhatsApp',
      waDescription: 'Respon cepat melalui WhatsApp',
      form: {
        name: 'Nama Lengkap',
        email: 'Alamat Email',
        service: 'Layanan yang Diminati',
        message: 'Pesan Anda',
        send: 'Kirim Pesan',
        namePlaceholder: 'Masukkan nama lengkap Anda',
        emailPlaceholder: 'nama@email.com',
        messagePlaceholder: 'Ceritakan project Anda...',
        selectService: 'Pilih layanan',
        services: [
          'Fotografi Wisuda',
          'Fotografi Event',
          'Videografi Sinematik',
          'Editing Video & Foto',
          'Web Development',
          'Lainnya',
        ],
        successMessage: 'Pesan terkirim! Kami akan segera menghubungi Anda.',
      },
      info: {
        whatsapp: 'WhatsApp',
        instagram: 'Instagram',
        location: 'Lokasi',
        locationValue: 'Indonesia',
        available: 'Senin - Sabtu, 08.00 - 20.00 WIB',
      },
    },
    // Footer
    footer: {
      tagline: 'Photography · Videography · Content Creation',
      description: 'Studio kreatif visual profesional yang siap mengabadikan momen dan menciptakan karya terbaik untuk Anda.',
      quickLinks: 'Tautan Cepat',
      services: 'Layanan',
      followUs: 'Ikuti Kami',
      rights: 'Hak cipta dilindungi.',
      madeWith: 'Dibuat dengan',
      by: 'oleh USB-5.0 VISUALS',
    },
  },
  en: {
    // Navbar
    nav: {
      home: 'Home',
      services: 'Services',
      portfolio: 'Portfolio',
      pricing: 'Pricing',
      about: 'About',
      contact: 'Contact',
    },
    // Hero
    hero: {
      tagline: 'Capture Moments,\nCreate Masterpieces',
      subtitle:
        'We deliver professional photography, videography, and content creation services with a stunning cinematic touch.',
      ctaPortfolio: 'View Portfolio',
      ctaContact: 'Contact Us',
      scrollDown: 'Scroll down',
    },
    // Services
    services: {
      title: 'Our Services',
      subtitle: 'Complete visual solutions for every need',
      items: [
        {
          title: 'Graduation Photography',
          description:
            'Capture your best graduation moment with high-quality professional photos. We ensure every detail is perfectly recorded.',
          tag: 'Graduation Photo',
        },
        {
          title: 'Event Photography',
          description:
            'Professional documentation for corporate events, weddings, and other occasions with stunning storytelling photos.',
          tag: 'Event Photo',
        },
        {
          title: 'Cinematic Videography',
          description:
            'High-quality cinematic video production with professional editing that brings a big-screen film atmosphere.',
          tag: 'Cinematic Video',
        },
        {
          title: 'Video & Photo Editing',
          description:
            'Professional post-production services for social media content, reels, highlights, and various visual needs.',
          tag: 'Post Production',
        },
        {
          title: 'Web Development',
          description:
            'Landing page, company profile, and full stack web app development services that are modern and responsive.',
          tag: 'Web Dev',
        },
      ],
    },
    // Portfolio
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Our best work for satisfied clients',
      filterAll: 'All',
      filterPhoto: 'Photography',
      filterVideo: 'Videography',
      filterWeb: 'Web',
      viewAll: 'View All',
    },
    // Pricing
    pricing: {
      title: 'Price List',
      subtitle: 'Transparent, affordable, and quality',
      note: 'Contact us for custom quotes and special packages',
      contactUs: 'Contact Us',
      perSession: '/ session',
      perPhoto: '/ photo',
      perMinute: '/ minute',
      perVideo: '/ video',
      popular: 'Most Popular',
      categories: [
        {
          name: 'Graduation Photography',
          icon: '🎓',
          packages: [
            {
              name: 'Basic',
              price: 'Rp 350,000',
              unit: '/ session',
              features: ['1 Hour Photo Session', '30 Edited Photos', 'HD Digital Files', '1x Revision'],
            },
            {
              name: 'Standard',
              price: 'Rp 600,000',
              unit: '/ session',
              popular: true,
              features: ['2 Hour Photo Session', '60 Edited Photos', 'HD Digital Files', '2x Revision', 'Digital Album'],
            },
            {
              name: 'Premium',
              price: 'Rp 1,000,000',
              unit: '/ session',
              features: [
                '3 Hour Photo Session',
                '100 Edited Photos',
                'HD Digital Files',
                '3x Revision',
                'Physical Album Print',
                'Free 1 Canvas Photo',
              ],
            },
          ],
        },
        {
          name: 'Event Photography',
          icon: '📸',
          packages: [
            {
              name: 'Half Day',
              price: 'Rp 800,000',
              unit: '',
              features: ['4 Hours Documentation', 'All Photos Edited', 'HD Digital Files', '3-Day Delivery'],
            },
            {
              name: 'Full Day',
              price: 'Rp 1,500,000',
              unit: '',
              popular: true,
              features: ['8 Hours Documentation', 'All Photos Edited', 'HD Digital Files', '3-Day Delivery', '1 Photographer'],
            },
            {
              name: 'Custom',
              price: 'Contact Us',
              unit: '',
              features: ['Flexible Duration', 'Multi Photographer', 'Premium Editing', 'Print Package', 'Free Consultation'],
            },
          ],
        },
        {
          name: 'Cinematic Videography',
          icon: '🎬',
          packages: [
            {
              name: 'Short Film',
              price: 'Rp 1,500,000',
              unit: '',
              features: ['1-3 Minute Duration', 'Color Grading', 'Background Music', '1x Revision'],
            },
            {
              name: 'Medium Film',
              price: 'Rp 2,500,000',
              unit: '',
              popular: true,
              features: ['3-7 Minute Duration', 'Cinematic Color Grade', 'Original Score', '2x Revision', 'Drone Shot (optional)'],
            },
            {
              name: 'Full Cinematic',
              price: 'Rp 4,000,000+',
              unit: '',
              features: ['7+ Minute Duration', 'Full Cinematic Production', 'Multi-Camera', '3x Revision', 'Drone Shot', '4K Master File'],
            },
          ],
        },
        {
          name: 'Video & Photo Editing',
          icon: '✂️',
          packages: [
            {
              name: 'Photo Edit',
              price: 'Rp 25,000',
              unit: '/ photo',
              features: ['Professional Retouching', 'Color Grading', 'Background Edit', 'HD File'],
            },
            {
              name: 'Video Edit',
              price: 'Rp 150,000',
              unit: '/ minute',
              popular: true,
              features: ['Cutting & Assembly', 'Color Grading', 'Subtitles & Text', 'Sound Design', '2x Revision'],
            },
            {
              name: 'Reels / Short',
              price: 'Rp 200,000',
              unit: '/ video',
              features: ['Vertical 9:16 Format', 'Trending Transitions', 'Captions & Stickers', 'Trending BGM', '1x Revision'],
            },
          ],
        },
        {
          name: 'Web Development',
          icon: '💻',
          packages: [
            {
              name: 'Landing Page',
              price: 'Rp 1,500,000',
              unit: '',
              features: ['1 Responsive Page', 'Modern Design', 'Basic SEO', 'Free Deployment'],
            },
            {
              name: 'Company Profile',
              price: 'Rp 3,000,000',
              unit: '',
              popular: true,
              features: ['5-10 Pages', 'CMS Admin Panel', 'SEO Optimized', 'Domain + Hosting 1 Year', 'Mobile Responsive'],
            },
            {
              name: 'Full Stack App',
              price: 'Rp 7,000,000+',
              unit: '',
              features: ['Custom Features', 'Database Integration', 'Auth & Dashboard', 'API Integration', '3-Month Support'],
            },
          ],
        },
      ],
    },
    // About
    about: {
      title: 'About Us',
      subtitle: 'Visuals that speak louder than a thousand words',
      description1:
        'USB-5.0 VISUALS is a creative studio focused on high-quality photography, videography, and visual content creation. We are here to help individuals, brands, and companies convey their messages through powerful and memorable visual work.',
      description2:
        'With a cinematic approach and deep attention to detail, we handle every project with full dedication. From unforgettable graduation moments to impactful brand campaigns, we are ready to bring your vision to life.',
      stats: [
        { value: '200+', label: 'Happy Clients' },
        { value: '500+', label: 'Projects Done' },
        { value: '3+', label: 'Years Experience' },
        { value: '5', label: 'Core Services' },
      ],
      values: [
        { title: 'Cinematic Quality', description: 'Every frame is crafted to the highest cinematic production standards.' },
        { title: 'On Time Delivery', description: 'We respect your time and always complete projects on schedule.' },
        { title: 'Creative & Innovative', description: 'Always bringing fresh ideas and unique visual approaches for each client.' },
      ],
    },
    // Contact
    contact: {
      title: 'Contact Us',
      subtitle: 'Ready to help bring your dream project to life',
      waButton: 'Chat on WhatsApp',
      waDescription: 'Fast response via WhatsApp',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        service: 'Service of Interest',
        message: 'Your Message',
        send: 'Send Message',
        namePlaceholder: 'Enter your full name',
        emailPlaceholder: 'name@email.com',
        messagePlaceholder: 'Tell us about your project...',
        selectService: 'Select a service',
        services: [
          'Graduation Photography',
          'Event Photography',
          'Cinematic Videography',
          'Video & Photo Editing',
          'Web Development',
          'Other',
        ],
        successMessage: 'Message sent! We will get back to you shortly.',
      },
      info: {
        whatsapp: 'WhatsApp',
        instagram: 'Instagram',
        location: 'Location',
        locationValue: 'Indonesia',
        available: 'Monday - Saturday, 08.00 - 20.00 WIB',
      },
    },
    // Footer
    footer: {
      tagline: 'Photography · Videography · Content Creation',
      description: 'A professional visual creative studio ready to capture moments and create the best work for you.',
      quickLinks: 'Quick Links',
      services: 'Services',
      followUs: 'Follow Us',
      rights: 'All rights reserved.',
      madeWith: 'Made with',
      by: 'by USB-5.0 VISUALS',
    },
  },
};

export type Translations = typeof translations.id;
