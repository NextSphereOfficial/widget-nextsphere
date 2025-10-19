# QR generator for local LAN testing

This script creates a QR code that points to your dev server at:
`http://192.168.1.2:8081/?hotel=ns-apartment&room=A1&lang=auto&source=room-card`

## Usage
1) Ensure `qrcode` is installed (already included in the previous package's package.json).
2) Run:
```bash
node tools/generate-one-qr-local.js
```
3) The QR will be created at `qr/ns-apartment-A1-local.png`.
