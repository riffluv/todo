import { glob } from 'glob';
import sharp from 'sharp';
import { dirname, join, parse } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function ensureDir(p) {
  await fs.promises.mkdir(p, { recursive: true });
}

async function convertOne(pngPath) {
  const { dir, name } = parse(pngPath);
  const webpPath = join(dir, `${name}.webp`);
  const avifPath = join(dir, `${name}.avif`);

  const buf = await fs.promises.readFile(pngPath);

  const results = { src: pngPath, webp: false, avif: false };

  if (!fs.existsSync(webpPath)) {
    await sharp(buf)
      .webp({ quality: 80 })
      .toFile(webpPath);
    results.webp = true;
  }
  if (!fs.existsSync(avifPath)) {
    await sharp(buf)
      .avif({ quality: 50 })
      .toFile(avifPath);
    results.avif = true;
  }
  return results;
}

async function main() {
  const projectRoot = join(__dirname, '..');
  const publicDir = join(projectRoot, 'public');
  await ensureDir(publicDir);

  const pngs = await glob('**/*.png', { cwd: publicDir, nodir: true });
  if (pngs.length === 0) {
    console.log('No PNG files found under public/.');
    return;
  }

  console.log(`Converting ${pngs.length} file(s) under public/ ...`);
  const tasks = pngs.map(async rel => {
    const abs = join(publicDir, rel);
    try {
      const r = await convertOne(abs);
      const created = [r.webp && 'webp', r.avif && 'avif'].filter(Boolean).join(', ') || 'none';
      console.log(`✓ ${rel} -> created: ${created}`);
    } catch (e) {
      console.error(`✗ Failed: ${rel}`, e.message);
    }
  });

  await Promise.all(tasks);
  console.log('Done.');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
