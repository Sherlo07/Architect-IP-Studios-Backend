import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./Models/index.js";
import AuthRouter from "./Routes/AuthRouter.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://architect-ip-studios-1.onrender.com",
];

// ✅ CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
  })
);

// ✅ JSON parser
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Static folders
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/projectImg", express.static(path.join(__dirname, "public/projectImg")));

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/auth", AuthRouter);

const BASE_URL = "https://architect-ip-studios-backend.onrender.com";

// Sample images
app.get("/api/architectimages", (req, res) => {
  const architect = [
    { id: 1, url: `${BASE_URL}/images/archimg1.jpeg` },
    { id: 2, url: `${BASE_URL}/images/archimg2.webp` },
    { id: 3, url: `${BASE_URL}/images/archimg3.webp` },
    { id: 4, url: `${BASE_URL}/images/archimg4.jpeg` },
    { id: 5, url: `${BASE_URL}/images/archimg5.jpeg` },
    { id: 6, url: `${BASE_URL}/projectImg/project2.webp` },
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

// ✅ Handle preflight OPTIONS requests for all routes
app.options("*", cors());

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  if (err.message === "CORS not allowed for this origin") {
    res.status(403).json({ message: "CORS not allowed for this origin" });
  } else {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
