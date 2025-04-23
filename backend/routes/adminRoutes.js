const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadFile, fetchCompanyData } = require("../controllers/adminController");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create the uploads directory if it doesn't exist
const upload = multer({
  storage,
    fileFilter: (req, file, cb) => {
      // Check file type
    const fileTypes = /pdf|txt/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      cb(null, true);
    } else {
      cb(new Error("Only .pdf and .txt files are allowed!"));
    }
  },
});

// File upload route
router.route("/upload")
  .post(upload.single("file"), uploadFile);

router.route("/companyData").get(fetchCompanyData);

module.exports = router;