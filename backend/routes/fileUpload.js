const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const textract = require("textract");

const router = express.Router();

// Set up Multer for file uploads
const upload = multer({ dest: "uploads/" });

// File upload API
router.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const filePath = path.join(__dirname, "..", "uploads", req.file.filename);
        
        textract.fromFileWithPath(filePath, async (err, text) => {
            if (err) {
                return res.status(500).json({ error: "Error extracting text" });
            }

            // Send extracted text to Flask plagiarism API
            const response = await axios.post("http://localhost:5000/check_plagiarism", {
                input_text: text,
                reference_texts: ["Sample reference text for plagiarism detection."]
            });

            // Delete uploaded file after processing
            fs.unlinkSync(filePath);

            res.json({ plagiarism_result: response.data });
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
