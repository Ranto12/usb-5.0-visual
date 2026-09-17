import re

with open('src/components/PriceList.tsx', 'r') as f:
    content = f.read()

# Add effect to listen for the event
effect = """
  // Listen for custom event to change active category
  useEffect(() => {
    const handleSelectCategory = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const slug = customEvent.detail;
      const idx = cmsCategories.findIndex(cat => cat.slug === slug);
      if (idx !== -1) {
        setActiveCategory(idx);
      }
    };
    window.addEventListener('selectPricingCategory', handleSelectCategory);
    return () => window.removeEventListener('selectPricingCategory', handleSelectCategory);
  }, [cmsCategories]);
"""

content = content.replace(
    "const [activeCategory, setActiveCategory] = useState(0);",
    "const [activeCategory, setActiveCategory] = useState(0);\n" + effect
)

with open('src/components/PriceList.tsx', 'w') as f:
    f.write(content)
