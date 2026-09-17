import { createReader } from '@keystatic/core/reader';
import config from './keystatic.config';
const reader = createReader(process.cwd(), config);
reader.singletons.hero.read().then(console.log).catch(console.error);
