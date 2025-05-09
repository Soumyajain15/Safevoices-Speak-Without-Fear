// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Import Routes
const reportRoutes = require("./routes/reportRoutes");
const communityRoutes = require("./routes/communityRoutes");
const counselingRoutes = require("./routes/counselingRoutes");
const authRoutes = require("./routes/authRoutes");

// API Routes
app.use("/api/report", reportRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/counseling", counselingRoutes);
app.use("/api/auth", authRoutes);

// Test Endpoint
app.get("/", (req, res) => {
  res.send("✅ SafeVoice API is Running...");
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

// Start Server
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running at: http://localhost:${PORT}`));
};

startServer();
