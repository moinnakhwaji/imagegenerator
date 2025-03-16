import express from "express";
import { Connectdb } from "./db/db.js";
import apiRoute from "./routes/api.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import UserRoute from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;  

// Connect to the database
Connectdb();

// CORS Configuration
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173", // Replace with frontend URL
        credentials: true, // Allow cookies and authorization headers
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Default route for root (Fixes "Cannot GET /")
app.get("/", (req, res) => {
    res.send("Welcome to the Image Generator API!");
});

// Routes
app.use("/api", apiRoute);
app.use("/api", UserRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
