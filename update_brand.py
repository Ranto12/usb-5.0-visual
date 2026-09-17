import re

with open('keystatic.config.tsx', 'r') as f:
    content = f.read()

brand_code = """import React from 'react';

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
    },"""

content = re.sub(
    r"export default config\(\{.*?ui: \{\n    brand: \{\n      name: 'USB-5\.0 VISUALS — Admin Panel',\n    \},",
    brand_code,
    content,
    flags=re.DOTALL
)

with open('keystatic.config.tsx', 'w') as f:
    f.write(content)
