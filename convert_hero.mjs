import { Jimp } from 'jimp';

const img = await Jimp.read('./src/assets/hero_bg.png');
img.resize({ w: 1440 });
// Write as JPEG (much smaller than PNG for photos)
await img.write('./src/assets/hero_bg.jpg');
console.log(`Saved hero_bg.jpg`);
