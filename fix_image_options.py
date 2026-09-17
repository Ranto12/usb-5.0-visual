import re
import os

with open('keystatic.config.tsx', 'r') as f:
    content = f.read()

# Fix Portfolio
port_search = r"image_url: fields\.image\(\{[\s\S]*?publicPath: '/images/portfolio',\n        \}\),"
port_replace = """image_file: fields.image({
          label: '1. Upload Gambar (Lokal)',
          description: 'Prioritas: Upload gambar dari komputer Anda.',
          directory: 'public/images/portfolio',
          publicPath: '/images/portfolio',
        }),
        image_url: fields.text({
          label: '2. Atau gunakan Link URL (Eksternal)',
          description: 'Alternatif: Paste link gambar. (Jika ada Upload Gambar di atas, link ini diabaikan).',
        }),"""
content = re.sub(port_search, port_replace, content)

# Fix About
about_search = r"image_url: fields\.image\(\{[\s\S]*?publicPath: '/images/about',\n        \}\),"
about_replace = """image_file: fields.image({
          label: '1. Upload Foto Tim (Lokal)',
          directory: 'public/images/about',
          publicPath: '/images/about',
        }),
        image_url: fields.text({
          label: '2. Atau gunakan Link URL (Eksternal)',
        }),"""
content = re.sub(about_search, about_replace, content)

with open('keystatic.config.tsx', 'w') as f:
    f.write(content)

