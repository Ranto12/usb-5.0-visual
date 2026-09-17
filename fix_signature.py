import re

with open('src/components/Services.tsx', 'r') as f:
    content = f.read()

# Fix the signature
content = re.sub(
    r"  index,\n\}: \{\n  icon: React\.ReactNode;\n  title: string;\n  description: string;\n  tag: string;\n  delay: number;\n  inView: boolean;\n  index: number;\n  slug: string;\n\}: \{",
    r"  index,\n  slug,\n}: {\n  icon: React.ReactNode;\n  title: string;\n  description: string;\n  tag: string;\n  delay: number;\n  inView: boolean;\n  index: number;\n  slug: string;\n",
    content
)

content = re.sub(
    r"  index,\n}: \{\n  icon: React\.ReactNode;\n  title: string;\n  description: string;\n  tag: string;\n  delay: number;\n  inView: boolean;\n  index: number;\n  slug: string;\n",
    r"  index,\n  slug,\n}: {\n  icon: React.ReactNode;\n  title: string;\n  description: string;\n  tag: string;\n  delay: number;\n  inView: boolean;\n  index: number;\n  slug: string;\n",
    content
)

with open('src/components/Services.tsx', 'w') as f:
    f.write(content)
