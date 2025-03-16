import express from "express";
import { Connectdb } from "./db/db.js";
import apiRoute from "./routes/api.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import UserRoute from "./routes/user.routes.js";

dotenv.config();

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
};

// Apply CORS middleware before defining routes
app.use(cors());
const PORT = process.env.PORT || 3000;  // Ensure a default port if `process.env.PORT` is undefined

Connectdb();

// Middleware to parse JSON bodies
app.use(express.json());

// Default route for root (Fixes "Cannot GET /")
app.get("/", (req, res) => {
    res.send("Welcome to the Image Generator API!");
});

// Route for API
app.use("/api", apiRoute);
app.use("/api", UserRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
