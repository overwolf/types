const fs = require('fs');
const path = require('path');

const inputFile = 'overwolf.d.ts'; // Update this to your actual filename
const outputDir = './modules';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const content = fs.readFileSync(inputFile, 'utf8');

/**
 * We split by the JSDoc blocks. 
 * This ensures the comments stay attached to the namespace below them.
 */
const chunks = content.split(/(?=\/\*\*)/);

let currentFileName = null;
let fileBuffers = {};

chunks.forEach(chunk => {
    // Regex looks for the namespace name (e.g., overwolf.extensions.io)
    const nsMatch = chunk.match(/declare namespace\s+([\w\.]+)/);

    if (nsMatch) {
        // We found a new namespace trigger
        currentFileName = `${nsMatch[1].trim()}.d.ts`;
    }

    if (currentFileName) {
        // Initialize the buffer for this file if it's the first time we see it
        if (!fileBuffers[currentFileName]) {
            fileBuffers[currentFileName] = '';
        }
        // Add this chunk of code/comment to the specific file buffer
        fileBuffers[currentFileName] += chunk;
    }
});

// Write all buffers to their respective files
Object.keys(fileBuffers).forEach(fileName => {
    const filePath = path.join(outputDir, fileName);
    fs.writeFileSync(filePath, fileBuffers[fileName], 'utf8');
    console.log(`Created: ${fileName}`);
});

console.log(`\nDone! Successfully split into ${Object.keys(fileBuffers).length} files.`);