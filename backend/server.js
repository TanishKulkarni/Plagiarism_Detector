const express = require('express');
const multer = require('multer');
const extractText = require('./utils/extractText');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        console.log('📂 Uploaded File:', file.originalname); // Debugging
        const ext = path.extname(file.originalname) || '.txt'; // Ensure extension
        cb(null, Date.now() + ext);
    }
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: '❌ No file uploaded' });

        const filePath = req.file.path;
        console.log('📥 Received file:', filePath);

        const extractedText = await extractText(filePath);
        res.json({ text: extractedText });
    } catch (err) {
        res.status(500).json({ error: '❌ Error extracting text: ' + err });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
