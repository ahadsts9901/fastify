import "dotenv/config"
import { v2 as cloudinary } from 'cloudinary';
import { PassThrough } from 'stream';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = (file) => {

    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error("File not provided"));
            return;
        }

        // Create a PassThrough stream to handle the file buffer
        const pass = new PassThrough();
        file.file.pipe(pass);

        // Upload the file to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
                folder: "fastify/file-upload"
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result); // Object of uploaded file including public URL
                }
            }
        );

        // Pipe the PassThrough stream to the Cloudinary upload stream
        pass.pipe(uploadStream);
        
    });
};