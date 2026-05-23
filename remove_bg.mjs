import { Jimp } from 'jimp';
import { writeFileSync } from 'fs';

const INPUT  = './src/assets/profile.jpeg';
const OUTPUT = './src/assets/profile_nobg.png';

async function main() {
  const img  = await Jimp.read(INPUT);
  const { width, height, data } = img.bitmap;

  console.log(`Image: ${width}x${height}`);

  // ── Helper: get/set pixel ──────────────────────────────────────────
  const idx  = (x, y) => (y * width + x) * 4;
  const getR = (x, y) => data[idx(x, y)];
  const getG = (x, y) => data[idx(x, y) + 1];
  const getB = (x, y) => data[idx(x, y) + 2];
  const setA = (x, y, a) => { data[idx(x, y) + 3] = a; };

  const dist = (r1,g1,b1, r2,g2,b2) =>
    Math.sqrt((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2);

  // ── Sample background colour from multiple edge points ────────────
  const samples = [];
  const step = 20;
  for (let x = 0; x < width; x += step) { samples.push([x, 0]); samples.push([x, height-1]); }
  for (let y = 0; y < height; y += step) { samples.push([0, y]); samples.push([width-1, y]); }

  let bgR = 0, bgG = 0, bgB = 0;
  for (const [x, y] of samples) { bgR += getR(x,y); bgG += getG(x,y); bgB += getB(x,y); }
  bgR = Math.round(bgR / samples.length);
  bgG = Math.round(bgG / samples.length);
  bgB = Math.round(bgB / samples.length);
  console.log(`Detected BG colour: rgb(${bgR},${bgG},${bgB})`);

  // ── BFS flood-fill from all 4 edges ──────────────────────────────
  const THRESHOLD = 38;   // colour tolerance
  const visited   = new Uint8Array(width * height);
  const queue     = [];

  const seed = (x, y) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const i = y * width + x;
    if (visited[i]) return;
    if (dist(getR(x,y),getG(x,y),getB(x,y), bgR,bgG,bgB) > THRESHOLD) return;
    visited[i] = 1;
    queue.push(x, y);   // push two values to avoid GC pressure
  };

  for (let x = 0; x < width;  x++) { seed(x, 0); seed(x, height-1); }
  for (let y = 0; y < height; y++) { seed(0, y); seed(width-1, y);   }

  // Iterative BFS
  for (let i = 0; i < queue.length; i += 2) {
    const x = queue[i], y = queue[i+1];
    setA(x, y, 0);
    seed(x+1, y); seed(x-1, y);
    seed(x, y+1); seed(x, y-1);
  }

  console.log(`Removed ${queue.length / 2} background pixels`);

  // ── Feather edges: blur alpha on the boundary strip ───────────────
  // One pass: if a transparent pixel has an opaque neighbour, give
  // that opaque neighbour partial alpha for a soft edge.
  const original = new Uint8Array(data);   // snapshot before feathering
  const featherRadius = 3;

  for (let y = featherRadius; y < height - featherRadius; y++) {
    for (let x = featherRadius; x < width - featherRadius; x++) {
      const i = y * width + x;
      if (original[i * 4 + 3] === 0) continue;  // already transparent

      // Count transparent neighbours in radius
      let transparentN = 0, total = 0;
      for (let dy = -featherRadius; dy <= featherRadius; dy++) {
        for (let dx = -featherRadius; dx <= featherRadius; dx++) {
          const ni = (y+dy) * width + (x+dx);
          total++;
          if (original[ni * 4 + 3] === 0) transparentN++;
        }
      }

      const ratio = transparentN / total;
      if (ratio > 0 && ratio < 1) {
        // Blend: fully opaque → partially transparent near the edge
        const alpha = Math.round(255 * (1 - ratio * 0.85));
        setA(x, y, Math.max(alpha, data[idx(x,y) + 3]));
      }
    }
  }

  // ── Write PNG (supports alpha) ────────────────────────────────────
  await img.write(OUTPUT);
  console.log(`✅  Saved: ${OUTPUT}`);
}

main().catch(err => { console.error(err); process.exit(1); });
