import { Jimp } from 'jimp';

const INPUT  = './src/assets/profile_nobg.png';
const OUTPUT = './src/assets/profile_nobg.png';  // overwrite in-place

async function main() {
  const img = await Jimp.read(INPUT);
  const { width, height } = img.bitmap;
  console.log(`Original: ${width}x${height}`);

  // Resize to max 600px wide (keeps aspect ratio)
  if (width > 600) {
    img.resize({ w: 600 });
    console.log(`Resized to 600px wide`);
  }

  await img.write(OUTPUT);
  console.log(`✅ Optimized saved: ${OUTPUT}`);
}

main().catch(err => { console.error(err); process.exit(1); });
