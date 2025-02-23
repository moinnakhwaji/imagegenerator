import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    base64: String, // To store the base64 image data
    imageUrl: String, // Optional: URL to the image if hosted on a server or cloud storage
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
         }, // Reference to the user who created the image
    createdAt: { type: Date, default: Date.now },
    downloads: { type: Number, default: 0 }, // Track the number of times the image has been downloaded
    views: { type: Number, default: 0 }, // Track the number of times the image has been viewed
});

export const ImageModel = mongoose.model("Image", ImageSchema);
