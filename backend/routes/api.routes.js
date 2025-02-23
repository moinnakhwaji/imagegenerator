import express from "express";
import { generateImage, getAllImagebyUserId, getAllImages, getImageById } from "../controllers/api.controllers.js";
import { isAuthenticated } from "../middleware/authMddelware.js";


const app = express.Router();



app.post("/create",isAuthenticated,generateImage)
app.get("/image/:id",getImageById);
app.get("/image",getAllImages)
app.get("/images/:userId",getAllImagebyUserId)



export default app