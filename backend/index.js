import express from "express";
import { Connectdb } from "./db/db.js";
import apiRoute from "./routes/api.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import UserRoute from "./routes/user.routes.js"
dotenv.config({ path: '.env.local' });

const app = express();


const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
};


// Apply CORS middleware before defining routes
app.use(cors(corsOptions));


Connectdb();

// Middleware to parse JSON bodies
app.use(express.json());

// Route for API
app.use("/api", apiRoute);
app.use("/api", UserRoute);

// Start the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
