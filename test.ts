import { singleton } from '@keystatic/core';
const about = singleton({
  label: 'About',
  path: 'src/content/about/index',
  format: { data: 'json' },
  schema: {}
});
