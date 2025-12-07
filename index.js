import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./Models/index.js"; // ✅ correct import
import AuthRouter from "./Routes/AuthRouter.js";

dotenv.config();

/* -------------------- path setup -------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* -------------------- app setup -------------------- */
const app = express();

/* -------------------- CORS -------------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://architect-ip-studios.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

/* -------------------- static -------------------- */
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/projectImg", express.static(path.join(__dirname, "public/projectImg")));

/* -------------------- routes -------------------- */
app.use("/auth", AuthRouter);

/* -------------------- base url -------------------- */
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

/* -------------------- APIs -------------------- */
app.get("/api/architectimages", (req, res) => {
  res.json([
    { id: 1, url: `https://images.pexels.com/photos/29885889/pexels-photo-29885889.jpeg` },
    { id: 2, url: `${BASE_URL}/images/archimg2.webp` },
    { id: 3, url: `${BASE_URL}/images/archimg3.webp` },
    { id: 4, url: `${BASE_URL}/images/archimg4.jpeg` },
    { id: 5, url: `${BASE_URL}/images/archimg5.jpeg` },
    { id: 6, url: `${BASE_URL}/projectImg/project2.webp` },
  ]);
});

app.get("/api/projects", (req, res) => {
  res.json([
    { id: 1, url: `https://images.pexels.com/photos/29885889/pexels-photo-29885889.jpeg` },
    { id: 2, url: `${BASE_URL}/projectImg/project2.webp` },
    { id: 3, url: `${BASE_URL}/projectImg/project3.jpeg` },
    { id: 4, url: `${BASE_URL}/projectImg/project4.jpeg` },
    { id: 5, url: `${BASE_URL}/projectImg/project5.jpeg` },
    { id: 6, url: `${BASE_URL}/projectImg/archimg2.webp` },
  ]);
});

/* -------------------- error handler -------------------- */
app.use((err, req, res, next) => {
  if (err.message === "CORS not allowed for this origin") {
    return res.status(403).json({ message: "CORS not allowed for this origin" });
  }
  res.status(500).json({ message: "Something went wrong!" });
});

/* -------------------- start server -------------------- */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // ✅ works now

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
