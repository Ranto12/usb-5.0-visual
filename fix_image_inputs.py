import re
import os
import json

with open('keystatic.config.tsx', 'r') as f:
    content = f.read()

# Fix About image_url
about_image = """image_url: fields.image({
          label: 'Foto Tim (Team Photo)',
          description: 'Upload foto tim atau studio',
          directory: 'public/images/about',
          publicPath: '/images/about',
        }),"""
content = re.sub(
    r"image_url: fields\.text\(\{.*?\}\),",
    about_image,
    content,
    count=1,
    flags=re.DOTALL
)

# Fix SiteSettings og_image
og_image = """og_image: fields.image({
          label: 'Gambar OG (Open Graph Image)',
          description: 'Upload gambar untuk thumbnail saat link dibagikan (sosmed).',
          directory: 'public/images/settings',
          publicPath: '/images/settings',
        }),"""
content = re.sub(
    r"og_image: fields\.text\(\{.*?\}\),",
    og_image,
    content,
    count=1,
    flags=re.DOTALL
)

# Fix Portfolio image_url
portfolio_image = """image_url: fields.image({
          label: 'Upload Gambar (Image)',
          description: 'Upload gambar karya portofolio Anda di sini.',
          directory: 'public/images/portfolio',
          publicPath: '/images/portfolio',
        }),"""
content = re.sub(
    r"image_url: fields\.text\(\{.*?\}\),",
    portfolio_image,
    content,
    count=1,
    flags=re.DOTALL
)

with open('keystatic.config.tsx', 'w') as f:
    f.write(content)

# We need to remove existing image_url from json files because Keystatic fields.image expects local paths, and picsum.photos might crash the admin UI preview.
def clear_image_urls(directory):
    for root, dirs, files in os.walk(directory):
        for name in files:
            if name.endswith('.json'):
                path = os.path.join(root, name)
                with open(path, 'r') as f:
                    try:
                        data = json.load(f)
                    except:
                        continue
                changed = False
                if 'image_url' in data:
                    data['image_url'] = None
                    changed = True
                if 'og_image' in data:
                    data['og_image'] = None
                    changed = True
                if changed:
                    with open(path, 'w') as f:
                        json.dump(data, f, indent=2)

clear_image_urls('src/content/')

