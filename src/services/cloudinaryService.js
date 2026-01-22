import axios from "axios";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = 'fashion Fuel';

if(!CLOUDINARY_CLOUD_NAME){
    console.warn('CLOUDINARY_CLOUD_NAME is not defined in .env file');
}

/**
 * Uploads an image file to Cloudinary
 * @param {File} file - The file object to upload
 * @returns {Promise<string>} - The secure URL of the uploaded image
 */
export const uploadImage = async (file) => {
    if(!file) {
        throw new Error('No file Provided')
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );
        
        return response.data.secure_url
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error)
        throw error
    }
}