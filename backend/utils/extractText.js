const textract = require('textract');
const pdf = require('pdf-parse');
const fs = require('fs');
const path = require('path');

async function extractText(filePath) {
    return new Promise((resolve, reject) => {
        console.log('📂 Received File:', filePath); // Debugging
        const fileExtension = path.extname(filePath).toLowerCase();
        console.log('📝 Processing File Type:', fileExtension); // Debugging

        if (!fileExtension) {
            return reject('❌ Error: File extension missing.');
        }

        if (fileExtension === '.pdf') {
            let dataBuffer = fs.readFileSync(filePath);
            pdf(dataBuffer)
                .then(data => resolve(data.text))
                .catch(err => reject('❌ PDF extraction failed: ' + err));
        } else if (fileExtension === '.txt') {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) reject('❌ TXT extraction failed: ' + err);
                else resolve(data);
            });
        } else if (['.doc', '.docx', '.rtf', '.odt'].includes(fileExtension)) {
            textract.fromFileWithPath(filePath, { preserveLineBreaks: true }, (err, text) => {
                if (err) reject('❌ Word extraction failed: ' + err);
                else resolve(text);
            });
        } else {
            reject('❌ Unsupported file type: ' + fileExtension);
        }
    });
}

module.exports = extractText;
