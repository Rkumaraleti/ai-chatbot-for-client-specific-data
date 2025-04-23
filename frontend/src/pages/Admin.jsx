import React, { useState } from "react";
import axios from "axios";

const Admin = () => {
  const [file, setFile] = useState(null); // State to store the selected file
  const [uploadStatus, setUploadStatus] = useState(""); // State to track upload status

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.type === "text/plain")
    ) {
      setFile(selectedFile);
      setUploadStatus(""); // Clear any previous status
    } else {
      setUploadStatus("Please upload a valid PDF or TXT file.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/admin/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("File upload failed");
      }
      setUploadStatus("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Admin File Upload</h1>
      <input
        type="file"
        accept=".pdf,.txt"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload
      </button>
      {uploadStatus && (
        <p className="mt-4 text-sm text-gray-700">{uploadStatus}</p>
      )}
    </div>
  );
};

export default Admin;
