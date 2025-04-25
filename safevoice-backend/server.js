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
const authRoutes = require("./routes/authRoutes"); // Import authentication routes

// Routes
app.use("/api/report", upload.single("evidence"), reportRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/counseling", counselingRoutes);
app.use("/api/auth", authRoutes); // Authentication Routes (Login/Register)

// Root Endpoint
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

// Start Server After DB Connection
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
};

startServer();
