const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

// 📌 Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.uploadToCloudinary = (folder) => async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }

        if (!cloudinary.config().cloud_name) {
            return res.status(500).json({ error: "Cloudinary chưa được cấu hình đúng!" });
        }

        const stream = cloudinary.uploader.upload_stream(
            { folder: folder }, // 📌 Ảnh được lưu trong thư mục "products" trên Cloudinary
            (error, result) => {
                if (error) {
                    console.error("Lỗi Cloudinary:", error);
                    return res.status(500).json({ error: "Lỗi upload ảnh lên Cloudinary!" });
                }


                req.body[req.file.fieldname] = result.secure_url;
                next();
            }
        );

        if (req.file.buffer) {
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        } else {
            return res.status(400).json({ error: "File ảnh không hợp lệ!" });
        }
    } catch (error) {
        console.error("Lỗi upload ảnh:", error);
        return res.status(500).json({ error: "Lỗi xử lý upload ảnh!" });
    }
};