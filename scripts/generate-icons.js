import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPNG(width, height, getPixel) {
  // width, height
  // RGB format
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter byte 0 (None)
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      const pxOffset = rowOffset + 1 + x * 4;
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a !== undefined ? a : 255;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth
  ihdr[9] = 6; // Color type: RGBA
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

// Simple CRC32 implementation
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

// Draw a themed icon: Sky blue background, floating green island with Doraemon bell & golden sparkle
function getPixel(x, y, w, h, isMaskable = false) {
  const nx = x / w;
  const ny = y / h;

  // Center coordinate (-1 to 1)
  const cx = (x - w / 2) / (w / 2);
  const cy = (y - h / 2) / (h / 2);
  const dist = Math.sqrt(cx * cx + cy * cy);

  // Background: Sky blue gradient (#38bdf8 to #0284c7)
  const rBg = Math.round(56 + (2 - 56) * ny);
  const gBg = Math.round(189 + (132 - 189) * ny);
  const bBg = Math.round(248 + (199 - 248) * ny);

  // If not maskable, round corners
  if (!isMaskable && dist > 1.25) {
    return [0, 0, 0, 0];
  }

  // Draw floating island (green ellipse at bottom half)
  const islandX = cx / 0.7;
  const islandY = (cy - 0.35) / 0.25;
  const islandDist = Math.sqrt(islandX * islandX + islandY * islandY);
  if (islandDist <= 1.0) {
    if (cy > 0.35) {
      // Brown earth underbelly
      return [133, 77, 14, 255]; // #854d0e
    } else {
      // Emerald lush grass
      return [34, 197, 94, 255]; // #22c55e
    }
  }

  // Draw Doraemon blue face / bell motif in center
  const headDist = Math.sqrt((cx) * (cx) + (cy + 0.1) * (cy + 0.1));
  if (headDist <= 0.42) {
    // White tummy/face center
    const innerDist = Math.sqrt((cx) * (cx) + (cy + 0.05) * (cy + 0.05));
    if (innerDist <= 0.30) {
      // Golden bell around cy = 0.2
      const bellDist = Math.sqrt(cx * cx + (cy - 0.15) * (cy - 0.15));
      if (bellDist <= 0.12) {
        return [234, 179, 8, 255]; // Golden yellow #eab308
      }
      return [255, 255, 255, 255]; // White
    }
    return [2, 132, 199, 255]; // Doraemon blue #0284c7
  }

  // Sprout leaves on top
  const sproutDist = Math.sqrt(cx * cx + (cy + 0.5) * (cy + 0.5));
  if (sproutDist <= 0.15) {
    return [74, 222, 128, 255]; // Light green #4ade80
  }

  // Default sky
  return [rBg, gBg, bBg, 255];
}

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. pwa-192x192.png
fs.writeFileSync(
  path.join(publicDir, 'pwa-192x192.png'),
  createPNG(192, 192, (x, y, w, h) => getPixel(x, y, w, h, false))
);

// 2. pwa-512x512.png
fs.writeFileSync(
  path.join(publicDir, 'pwa-512x512.png'),
  createPNG(512, 512, (x, y, w, h) => getPixel(x, y, w, h, false))
);

// 3. pwa-maskable-512x512.png
fs.writeFileSync(
  path.join(publicDir, 'pwa-maskable-512x512.png'),
  createPNG(512, 512, (x, y, w, h) => getPixel(x, y, w, h, true))
);

// 4. apple-touch-icon.png (180x180)
fs.writeFileSync(
  path.join(publicDir, 'apple-touch-icon.png'),
  createPNG(180, 180, (x, y, w, h) => getPixel(x, y, w, h, false))
);

// 5. favicon.ico (fallback 32x32 png saved as favicon.ico)
fs.writeFileSync(
  path.join(publicDir, 'favicon.ico'),
  createPNG(32, 32, (x, y, w, h) => getPixel(x, y, w, h, false))
);

console.log('Successfully generated PWA and Apple Touch PNG icons in /public!');
