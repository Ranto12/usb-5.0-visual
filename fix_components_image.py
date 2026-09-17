import re

# -- Portfolio --
with open('src/components/Portfolio.tsx', 'r') as f:
    port = f.read()

port = re.sub(
    r"image_url: string \| null;",
    "image_file?: string | null;\n  image_url?: string | null;",
    port
)

port = re.sub(
    r"src=\{item\.image_url \|\| 'https:\/\/picsum\.photos.*?\}",
    "src={item.image_file || item.image_url || 'https://picsum.photos/seed/placeholder/600/800'}",
    port
)

port = re.sub(
    r"src=\{lightbox\.image_url \|\| 'https:\/\/picsum\.photos.*?\}",
    "src={lightbox.image_file || lightbox.image_url || 'https://picsum.photos/seed/placeholder/600/800'}",
    port
)

with open('src/components/Portfolio.tsx', 'w') as f:
    f.write(port)

# -- About --
with open('src/components/About.tsx', 'r') as f:
    about = f.read()

about = re.sub(
    r"image_url: string \| null;",
    "image_file?: string | null;\n  image_url?: string | null;",
    about
)

about = re.sub(
    r"src=\{aboutData\?\.image_url \|\| 'https:\/\/picsum\.photos.*?\}",
    "src={aboutData?.image_file || aboutData?.image_url || 'https://picsum.photos/seed/about-usb/800/1000'}",
    about
)

with open('src/components/About.tsx', 'w') as f:
    f.write(about)

