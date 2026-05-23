import { Jimp } from 'jimp';

const img = await Jimp.read('./src/assets/hero_bg.png');
console.log(`Original: ${img.bitmap.width}x${img.bitmap.height}`);
// Resize to 1600px wide for hero bg — good quality, reasonable size
img.resize({ w: 1600 });
await img.write('./src/assets/hero_bg.png');
console.log(`Saved 1600px wide hero_bg.png`);
