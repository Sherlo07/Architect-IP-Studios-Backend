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

// ✅ Serve static files
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/projectImg", express.static(path.join(__dirname, "public/projectImg")));

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// ✅ Get architect images
app.get("/api/architectimages", (req, res) => {
  const architect = [
    { id: 1, url: "/images/archimg1.jpeg" },
    { id: 2, url: "/images/archimg2.webp" },
    { id: 3, url: "/images/archimg3.webp" },
    { id: 4, url: "/images/archimg4.jpeg" },
    { id: 5, url: "/images/archimg5.jpeg" },
    { id: 6, url: "/projectImg/project2.webp" },
  ];
  res.json(architect);
});

// ✅ Get project images
app.get("/api/projects", (req, res) => {
  const projectImages = [
    { id: 1, url: "/projectImg/project1.jpeg" },
    { id: 2, url: "/projectImg/project2.webp" },
    { id: 3, url: "/projectImg/project3.jpeg" },
    { id: 4, url: "/projectImg/project4.jpeg" },
    { id: 5, url: "/projectImg/project5.jpeg" },
    { id: 6, url: "/projectImg/archimg2.webp" },
  ];
  res.json(projectImages);
});



// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
