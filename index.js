import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./db/index.js";




dotenv.config(); // Load .env variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // ✅ Initialize app first

app.use(express.json()); // ✅ Middleware to parse JSON
app.use(cors());
connectDB(); // ✅ Connect to MongoDB

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/projectImg", express.static(path.join(__dirname, "public/projectImg"))); 

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// ✅ Get architect images



// ✅ Get project images
const BASE_URL = "https://architect-ip-studios-backend.onrender.com";


app.get("/api/architectimages", (req, res) => {
  const architect = [
    { id: 1, url: `${BASE_URL}/images/archimg1.jpeg` },
    { id: 2, url: `${BASE_URL}/images/archimg2.webp` },
    { id: 3, url: `${BASE_URL}/images/archimg3.webp` },
    { id: 4, url: `${BASE_URL}/images/archimg4.jpeg` },
    { id: 5, url: `${BASE_URL}/images/archimg5.jpeg` },
    { id: 6, url: `${BASE_URL}/projectImg/project2.webp` }, // Ensure this image exists in "public/projectImg"
  ];
  res.json(architect);
});

app.get("/api/projects", (req, res) => {
  const projectImages = [
    { id: 1, url: `${BASE_URL}/projectImg/project1.jpeg` },
    { id: 2, url: `${BASE_URL}/projectImg/project2.webp` },
    { id: 3, url: `${BASE_URL}/projectImg/project3.jpeg` },
    { id: 4, url: `${BASE_URL}/projectImg/project4.jpeg` },
    { id: 5, url: `${BASE_URL}/projectImg/project5.jpeg` },
    { id: 6, url: `${BASE_URL}/projectImg/archimg2.webp` },
  ];
  res.json(projectImages);
});




// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
