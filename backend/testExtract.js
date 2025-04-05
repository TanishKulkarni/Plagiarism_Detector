const extractText = require('./utils/extractText');

const testFile = 'C:\\Users\\Tanish\\Downloads\\tst file.txt'; // Change path

extractText(testFile)
    .then(text => console.log('Extracted Text:', text))
    .catch(err => console.error('Extraction Failed:', err));
