// tools/generate-one-qr-local.js
// Usage: node tools/generate-one-qr-local.js
// Generates a QR that points to your dev server on the same LAN.
import QRCode from 'qrcode';
import { mkdirSync } from 'fs';
import { dirname } from 'path';

const out = './qr/ns-apartment-A1-local.png';
mkdirSync(dirname(out), { recursive: true });

const url = 'http://192.168.1.2:8081/?hotel=ns-apartment&room=A1&lang=auto&source=room-card';
await QRCode.toFile(out, url, { margin: 2, width: 1024 });
console.log('✅ QR saved to', out);
console.log('➡️  URL:', url);
