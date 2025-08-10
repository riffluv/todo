/**
 * Remaining Images Optimization Script
 * 
 * @description 熊さんアイコン・ロゴ・その他画像を最適化
 * 回線が遅くても快適な読み込み＋軽快なアニメーションを実現
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const PUBLIC_DIR = 'public';

// 画像別最適化設定
const OPTIMIZATION_CONFIGS = {
  // 熊さんアイコン（BearIcon・クリックアニメーション用）
  'manabyicon.png': {
    width: 64,   // 小さなアイコンなので64pxで十分
    height: 64,
    webpQuality: 80,
    avifQuality: 70,
    description: '熊さんアイコン（クリックアニメーション）'
  },
  
  // ロゴ画像（Loading画面用）
  'manabylogo.png': {
    width: 120,  // ロゴサイズ
    height: 120,
    webpQuality: 85,  // ロゴは少し高品質に
    avifQuality: 75,
    description: 'ロゴ画像（Loading画面）'
  },
  
  // PC用画像（用途不明だが最適化）
  'manabykun_pc05.png': {
    width: 160,  // キャラクター画像と同じサイズ
    height: 160,
    webpQuality: 75,
    avifQuality: 65,
    description: 'PC用キャラクター画像'
  }
};

async function optimizeImage(inputPath, outputPath, format, config) {
  try {
    const sharpInstance = sharp(inputPath)
      .resize(config.width, config.height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 } // 透明背景保持
      });

    if (format === 'webp') {
      await sharpInstance
        .webp({ quality: config.webpQuality })
        .toFile(outputPath);
    } else if (format === 'avif') {
      await sharpInstance
        .avif({ quality: config.avifQuality })
        .toFile(outputPath);
    }

    // ファイルサイズ確認
    const stats = await fs.stat(outputPath);
    const sizeKB = Math.round(stats.size / 1024);
    console.log(`  ✓ ${path.basename(outputPath)}: ${sizeKB}KB`);
    
    return sizeKB;
    
  } catch (error) {
    console.error(`  ✗ Error processing ${inputPath}:`, error.message);
    return 0;
  }
}

async function main() {
  console.log('🎨 Optimizing remaining images for better performance...\n');
  
  let totalSavings = 0;
  
  for (const [imageName, config] of Object.entries(OPTIMIZATION_CONFIGS)) {
    const inputPath = path.join(PUBLIC_DIR, imageName);
    const baseName = path.parse(imageName).name;
    
    // 元ファイルの存在確認
    try {
      await fs.access(inputPath);
    } catch {
      console.log(`⚠️  ${imageName} not found, skipping...`);
      continue;
    }
    
    // 元ファイルサイズ確認
    const originalStats = await fs.stat(inputPath);
    const originalSizeKB = Math.round(originalStats.size / 1024);
    
    console.log(`📸 ${config.description}`);
    console.log(`   Original: ${originalSizeKB}KB`);
    
    // WebP最適化
    const webpPath = path.join(PUBLIC_DIR, `${baseName}.webp`);
    const webpSizeKB = await optimizeImage(inputPath, webpPath, 'webp', config);
    
    // AVIF最適化
    const avifPath = path.join(PUBLIC_DIR, `${baseName}.avif`);
    const avifSizeKB = await optimizeImage(inputPath, avifPath, 'avif', config);
    
    // 削減量計算（WebPベース）
    const savings = originalSizeKB - webpSizeKB;
    totalSavings += savings;
    
    if (savings > 0) {
      const savingsPercent = Math.round((savings / originalSizeKB) * 100);
      console.log(`   💾 Saved: ${savings}KB (${savingsPercent}% reduction)`);
    }
    
    console.log('');
  }
  
  console.log('🎉 Remaining image optimization completed!');
  console.log(`📊 Total savings: ${totalSavings}KB`);
  console.log('🚀 Benefits:');
  console.log('   • Faster loading on slow connections');
  console.log('   • Smoother bear icon animations');
  console.log('   • Quicker loading screen experience');
  console.log('   • Overall better mobile performance');
}

main().catch(console.error);
