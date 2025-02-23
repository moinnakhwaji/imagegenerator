import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/usercontrollers.js';

const app = express.Router();

app.post("/register",registerUser)
app.post("/login",loginUser)
app.post("/logout", logoutUser);

export default app