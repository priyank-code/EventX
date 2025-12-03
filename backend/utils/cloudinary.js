const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD,
api_key: process.env.CLOUDINARY_KEY,
api_secret: process.env.CLOUDINARY_SECRET,
secure: true,
});

// Buffer upload function
function uploadBuffer(buffer, folder = "qrcodes") {
return new Promise((resolve, reject) => {
const stream = cloudinary.uploader.upload_stream(
{
folder,
resource_type: "image",
},
(err, result) => {
if (err) return reject(err);
resolve(result.secure_url);
}
);
stream.end(buffer); // buffer ko stream me daal ke upload karo
});
}

module.exports = {
cloudinary,
uploadBuffer,
};