import re

with open('keystatic.config.tsx', 'r') as f:
    content = f.read()

# Replace the boundary between singletons and collections
boundary_search = r"    portfolio: collection\(\{"
boundary_replace = r"""  },

  collections: {
    portfolio: collection({"""

content = re.sub(boundary_search, boundary_replace, content)

with open('keystatic.config.tsx', 'w') as f:
    f.write(content)

