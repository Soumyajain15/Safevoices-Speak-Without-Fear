const express = require("express");
const router = express.Router();
const multer = require("multer");
const { submitReport, getIncidentCategories } = require("../controllers/reportControllers");

// ✅ Fix: Correct Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Ensure correct route
router.post("/submit", upload.single("evidence"), submitReport);
router.get("/categories", getIncidentCategories);

module.exports = router;
