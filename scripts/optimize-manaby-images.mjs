/**
 * Manaby Character Image Optimization Script
 * 
 * @description まなびー君画像を他の人物画像と同じサイズ・品質に最適化
 * ファイルサイズを146KB→10-15KB程度に削減
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const PUBLIC_DIR = 'public';

// 最適化設定（斎藤さん・作田さんと同じ品質に合わせる）
const OPTIMIZATION_CONFIG = {
  // 解像度: 160px（最大表示サイズ）で十分
  width: 160,
  height: 160,
  // WebP品質: 他の画像と同レベル
  webpQuality: 75,
  // AVIF品質: より高効率
  avifQuality: 65,
};

// 最適化対象のまなびー君画像
const MANABY_IMAGES = [
  'manaby-jump2.png',
  'manabydash.png',
];

async function optimizeImage(inputPath, outputPath, format) {
  try {
    const sharpInstance = sharp(inputPath)
      .resize(OPTIMIZATION_CONFIG.width, OPTIMIZATION_CONFIG.height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 } // 透明背景保持
      });

    if (format === 'webp') {
      await sharpInstance
        .webp({ quality: OPTIMIZATION_CONFIG.webpQuality })
        .toFile(outputPath);
    } else if (format === 'avif') {
      await sharpInstance
        .avif({ quality: OPTIMIZATION_CONFIG.avifQuality })
        .toFile(outputPath);
    }

    // ファイルサイズ確認
    const stats = await fs.stat(outputPath);
    console.log(`✓ ${path.basename(outputPath)}: ${Math.round(stats.size / 1024)}KB`);
    
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message);
  }
}

async function main() {
  console.log('🎨 Optimizing Manaby character images...\n');
  
  for (const imageName of MANABY_IMAGES) {
    const inputPath = path.join(PUBLIC_DIR, imageName);
    const baseName = path.parse(imageName).name;
    
    // 元ファイルの存在確認
    try {
      await fs.access(inputPath);
    } catch {
      console.log(`⚠️  ${imageName} not found, skipping...`);
      continue;
    }
    
    console.log(`Processing ${imageName}...`);
    
    // WebP最適化
    const webpPath = path.join(PUBLIC_DIR, `${baseName}.webp`);
    await optimizeImage(inputPath, webpPath, 'webp');
    
    // AVIF最適化
    const avifPath = path.join(PUBLIC_DIR, `${baseName}.avif`);
    await optimizeImage(inputPath, avifPath, 'avif');
  }
  
  console.log('\n🎉 Manaby image optimization completed!');
  console.log('📊 Expected file sizes: 10-15KB (similar to compact avatar illustrations)');
  console.log('🚀 Performance improvement: ~90% file size reduction');
}

main().catch(console.error);
