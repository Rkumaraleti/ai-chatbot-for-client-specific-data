const mongoose = require("mongoose");

const FaqShema = new mongoose.Schema({
  filename: { type: String, required: true },
  content: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CompanyData", FaqShema);