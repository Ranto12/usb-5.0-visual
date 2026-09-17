import re

with open('keystatic.config.ts', 'r') as f:
    content = f.read()

# Fix singletons
content = re.sub(
    r"(hero:\s*singleton\(\{[\s\S]*?)path:\s*'src/content/hero',",
    r"\1path: 'src/content/hero/index',\n      format: { data: 'json' },",
    content
)

content = re.sub(
    r"(contact:\s*singleton\(\{[\s\S]*?)path:\s*'src/content/contact',",
    r"\1path: 'src/content/contact/index',\n      format: { data: 'json' },",
    content
)

content = re.sub(
    r"(siteSettings:\s*singleton\(\{[\s\S]*?)path:\s*'src/content/settings',",
    r"\1path: 'src/content/settings/index',\n      format: { data: 'json' },",
    content
)

# Fix collections
content = re.sub(
    r"(services:\s*collection\(\{[\s\S]*?)slugField:\s*'slug',",
    r"\1slugField: 'slug',\n      format: { data: 'json' },",
    content
)

content = re.sub(
    r"(portfolio:\s*collection\(\{[\s\S]*?)slugField:\s*'slug',",
    r"\1slugField: 'slug',\n      format: { data: 'json' },",
    content
)

content = re.sub(
    r"(pricingCategories:\s*collection\(\{[\s\S]*?)slugField:\s*'slug',",
    r"\1slugField: 'slug',\n      format: { data: 'json' },",
    content
)

content = re.sub(
    r"(testimonials:\s*collection\(\{[\s\S]*?)slugField:\s*'slug',",
    r"\1slugField: 'slug',\n      format: { data: 'json' },",
    content
)

with open('keystatic.config.ts', 'w') as f:
    f.write(content)

