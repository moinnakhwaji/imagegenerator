import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";
import { ImageModel } from "../models/ImageModel.js"; 

dotenv.config();

export const generateImage = async (req, res) => {
    const { prompt } = req.body;
    const userId = req.user ? req.user.userId : null; // Use userId instead of _id

    // console.log("User in generateImage:", req.user); // Debugging
    // console.log("User ID in Backend:", userId); // Debugging
    try {
        const form = new FormData();
        form.append("prompt", prompt || "shot of vaporwave fashion dog in miami");

        const response = await axios.post("https://clipdrop-api.co/text-to-image/v1", form, {
            headers: {
                "x-api-key": process.env.CLIPDROP_API_KEY,
                ...form.getHeaders(),
            },
            responseType: "arraybuffer",
        });

        // Convert image buffer to Base64
        const base64Image = `data:image/png;base64,${Buffer.from(response.data).toString("base64")}`;

        // Save to database (MongoDB) with the userId
        const image = new ImageModel({ 
            base64: base64Image, 
            createdBy: userId 
        });
        await image.save();

        res.json({ success: true, base64Image });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to generate image", error: error.message });
    }
};


export const getAllImagebyUserId = async (req,res)=>{
    try {
        const {userId} = req.params
        if(!userId){
            return res.status(400).json({ message: "Please provide a userId" });
        }
        const images = await ImageModel.find({
            createdBy: userId
        })
        if(images.length === 0){
            return res.status(404).json({ message: "No images found for this user" });
        }
        res.json({ success: true, images });

        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to fetch images", error: error.message });
        
    }
}


export const getImageById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const image = await ImageModel.findById(id);
        if (!image) return res.status(404).json({ message: "Image not found" });

        res.json({ success: true, base64Image: image.base64 });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch image", error: error.message });
    }
};
export const getAllImages = async (req, res) => {
    try {
      const images = await ImageModel.find();  
      if (images.length === 0) {
        return res.status(404).json({ message: "No images found" });
      }
  
     res.json({ success: true, images });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch images", error: error.message });
    }
  };