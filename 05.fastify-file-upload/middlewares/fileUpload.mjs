import { uploadOnCloudinary } from "../utils/cloudinary.mjs"

export const fileUploadMiddleware = async (req, res) => {

    try {

        const file = await req?.file()
        const fileResp = await uploadOnCloudinary(file)

        res.send({
            message: "file uploaded successfully",
            fileUrl: fileResp?.url
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

}




// for multiple files


// export const fileUploadMiddleware = async (req, res) => {
//     try {
//         const parts = req.parts();
//         const files = [];

//         for await (const part of parts) {
//             if (part.file) {
//                 // Collect file information and content
//                 const chunks = [];
                
//                 part.file.on('data', chunk => {
//                     chunks.push(chunk);
//                 });

//                 await new Promise((resolve, reject) => {
//                     part.file.on('end', () => resolve());
//                     part.file.on('error', reject);
//                 });

//                 const fileBuffer = Buffer.concat(chunks);
//                 files.push({
//                     filename: part.filename,
//                     mimetype: part.mimeType,
//                     buffer: fileBuffer
//                 });

//                 console.log(`Received file ${part.filename}`);
//             } else {
//                 // Handle other form fields if needed
//                 console.log(`Field ${part.fieldname}: ${part.value}`);
//             }
//         }

//         // Process files as needed (e.g., store in a database, pass to another service)
//         console.log('Files:', files);

//         res.send({ message: 'Files processed successfully', files: files.map(file => file.filename) });
//     } catch (error) {
//         console.error('Error in fileUploadMiddleware:', error);
//         res.status(500).send({
//             message: "Internal server error",
//             error: error?.message
//         });
//     }
// };