const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const faqModel = require("../models/faqModel"); // Replace with your actual Mongoose model

// Function to extract text from a .txt file
const extractTextFromTxt = (filePath) => {
  return fs.readFileSync(filePath, "utf-8");
};

// Function to extract text from a PDF file
const extractTextFromPdf = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);
  return pdfData.text;
};

// Controller to handle file upload and text extraction
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    const fileExtension = path.extname(req.file.originalname).toLowerCase();

    let extractedText = "";

    // Extract text based on file type
    if (fileExtension === ".txt") {
      extractedText = extractTextFromTxt(filePath);
    } else if (fileExtension === ".pdf") {
      extractedText = await extractTextFromPdf(filePath);
    } else {
      return res.status(400).json({ message: "Unsupported file type." });
    }

    // Save extracted text to the database
    const document = new faqModel({
      filename: req.file.originalname,
      content: extractedText,
    });
      await document.save();
      
    // Delete the uploaded file after processing
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });

    res.status(200).json({ message: "File processed and text saved successfully!" });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ message: "An error occurred while processing the file." });
  }
};

// Controller to fetch company data from the database
const companyData = async (req, res) => {
  try {
    const data = await faqModel.find();
    return data.map(e => e.content);
  } catch (error) {
    console.error("Error fetching company data:", error);
      return { message: "An error occurred while fetching company data." };
  }
}

// Controller to fetch company data from the database
const fetchCompanyData = async (req, res) => {
  try {
      const data = await faqModel.find();
    res.status(200).json(data.map(e => e.content));
  } catch (error) {
    console.error("Error fetching company data:", error);
    res.status(500).json({ message: "An error occurred while fetching company data." });
  }
}

module.exports = { uploadFile, fetchCompanyData, companyData };