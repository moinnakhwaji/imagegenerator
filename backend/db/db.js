import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config();
export const Connectdb = () => {
    const MongoURL = process.env.MONGO_URL;
    if (!MongoURL) {
        console.error("MongoDB URL is missing from .env");
        return;
    }

    mongoose.connect(MongoURL,)
        .then(() => console.log('DB Connected'))
        .catch(err => console.error('DB connection error', err));
};
