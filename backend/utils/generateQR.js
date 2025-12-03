const QRCode = require("qrcode");

// text -> PNG buffer
async function generateQR(text) {
try {
const buffer = await QRCode.toBuffer(text, { type: "png" });
return buffer; // ye buffer Cloudinary me upload ho sakta hai
} catch (err) {
throw new Error("QR generation failed: " + err.message);
}
}

module.exports = { generateQR };