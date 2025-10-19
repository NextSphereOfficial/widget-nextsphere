// tools/generate-one-qr.js
// Usage: node tools/generate-one-qr.js
import QRCode from 'qrcode';
import { mkdirSync } from 'fs';
import { dirname } from 'path';
const out = './qr/ns-apartment-A1.png';
mkdirSync(dirname(out), { recursive: true });

const url = 'https://concierge.nextsphere.app/?hotel=ns-apartment&room=A1&lang=auto&source=room-card';
await QRCode.toFile(out, url, { margin: 2, width: 1024 });
console.log('✅ QR saved to', out);
