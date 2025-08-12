// PNG -> high-quality WebP converter for manaby logo
// Usage: node scripts/convert-logo-to-webp.mjs

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = path.resolve(process.cwd());
const inputPath = path.join(projectRoot, 'public', 'manabylogo.png');
const outputPath = path.join(projectRoot, 'public', 'manabylogo.webp');

async function main() {
  try {
    const input = await fs.readFile(inputPath);
    const image = sharp(input, { unlimited: true });
    const meta = await image.metadata();

    // Use near-lossless for maximum fidelity; fall back to quality if needed
    const webpBuffer = await image
      // no resize: keep original pixel dimensions
      .webp({
        // nearLossless preserves details for PNG sources very well
        nearLossless: true,
        quality: 100, // used in combination with nearLossless
        effort: 6,    // encoding effort/speed tradeoff
        alphaQuality: 100,
      })
      .toBuffer();

    await fs.writeFile(outputPath, webpBuffer);

    const outMeta = await sharp(webpBuffer).metadata();

    console.log('Conversion completed.');
    console.log('Input PNG:', { width: meta.width, height: meta.height, format: meta.format });
    console.log('Output WebP:', { width: outMeta.width, height: outMeta.height, format: outMeta.format });
    console.log('Saved to:', outputPath);
  } catch (err) {
    console.error('Conversion failed:', err);
    process.exit(1);
  }
}

main();
