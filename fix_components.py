import re
import os

# -- 1. Fix src/lib/content.ts --
# We don't actually need to change content.ts if it just returns `any` or relies on `createReader`. But wait, does it cast types?
# Let's check `content.ts` for interfaces.
# No HeroData, AboutData, etc. in `content.ts` because it just reads and returns. The components declare the interfaces locally!

# -- 2. Fix Hero.tsx --
with open('src/components/Hero.tsx', 'r') as f:
    hero = f.read()

hero = re.sub(r"interface HeroData \{.*?\}", """interface HeroData {
  tagline: { id: string; en: string };
  subtitle: { id: string; en: string };
  stats: { val: string; label: string }[];
}""", hero, flags=re.DOTALL)

hero = re.sub(
    r"const tagline = heroData\s*\?\s*\(language === 'id' \? heroData\.tagline_id : heroData\.tagline_en\)\s*: t\.hero\.tagline;",
    "const tagline = heroData ? (language === 'id' ? heroData.tagline.id : heroData.tagline.en) : t.hero.tagline;",
    hero
)
hero = re.sub(
    r"const subtitle = heroData\s*\?\s*\(language === 'id' \? heroData\.subtitle_id : heroData\.subtitle_en\)\s*: t\.hero\.subtitle;",
    "const subtitle = heroData ? (language === 'id' ? heroData.subtitle.id : heroData.subtitle.en) : t.hero.subtitle;",
    hero
)
hero = re.sub(
    r"const stats = heroData\s*\? \[.*?\]\s*: \[",
    "const stats = heroData ? heroData.stats : [",
    hero,
    flags=re.DOTALL
)

with open('src/components/Hero.tsx', 'w') as f:
    f.write(hero)

# -- 3. Fix About.tsx --
with open('src/components/About.tsx', 'r') as f:
    about = f.read()

about = re.sub(r"interface AboutData \{.*?\}", """interface AboutData {
  title: { id: string; en: string };
  subtitle: { id: string; en: string };
  description1: { id: string; en: string };
  description2: { id: string; en: string };
  image_url: string | null;
  stats: { value: string; label_id: string; label_en: string }[];
}""", about, flags=re.DOTALL)

about = re.sub(r"aboutData\.title_id", "aboutData.title.id", about)
about = re.sub(r"aboutData\.title_en", "aboutData.title.en", about)
about = re.sub(r"aboutData\.subtitle_id", "aboutData.subtitle.id", about)
about = re.sub(r"aboutData\.subtitle_en", "aboutData.subtitle.en", about)
about = re.sub(r"aboutData\.description1_id", "aboutData.description1.id", about)
about = re.sub(r"aboutData\.description1_en", "aboutData.description1.en", about)
about = re.sub(r"aboutData\.description2_id", "aboutData.description2.id", about)
about = re.sub(r"aboutData\.description2_en", "aboutData.description2.en", about)

with open('src/components/About.tsx', 'w') as f:
    f.write(about)

# -- 4. Fix Contact.tsx, Navbar.tsx, Footer.tsx (they use ContactData) --
contact_interface = """interface ContactData {
  socials: {
    whatsapp: string;
    instagram: string;
    instagram_url: string;
    youtube_url: string;
    tiktok_url: string;
  };
  location: { id: string; en: string };
  available: { id: string; en: string };
}"""

for file in ['src/components/Contact.tsx', 'src/components/Navbar.tsx', 'src/components/Footer.tsx']:
    with open(file, 'r') as f:
        comp = f.read()
    
    comp = re.sub(r"interface ContactData \{.*?\}", contact_interface, comp, flags=re.DOTALL)
    
    comp = re.sub(r"contactData\?\.whatsapp", "contactData?.socials.whatsapp", comp)
    comp = re.sub(r"contactData\?\.instagram([^_])", r"contactData?.socials.instagram\1", comp) # match instagram but not instagram_url
    comp = re.sub(r"contactData\?\.instagram_url", "contactData?.socials.instagram_url", comp)
    comp = re.sub(r"contactData\?\.youtube_url", "contactData?.socials.youtube_url", comp)
    comp = re.sub(r"contactData\?\.tiktok_url", "contactData?.socials.tiktok_url", comp)
    comp = re.sub(r"contactData\?\.location_id", "contactData?.location.id", comp)
    comp = re.sub(r"contactData\?\.location_en", "contactData?.location.en", comp)
    comp = re.sub(r"contactData\?\.available_id", "contactData?.available.id", comp)
    comp = re.sub(r"contactData\?\.available_en", "contactData?.available.en", comp)
    
    with open(file, 'w') as f:
        f.write(comp)

# -- 5. Fix page.tsx (siteSettings if any) --
# Actually siteSettings is used in layout.tsx? Let's check where getSiteSettings is used.
