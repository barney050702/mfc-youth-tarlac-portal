const fs = require('fs');

const htmlPath = 'index.html';
const eventsJsPath = 'src/modules/events.js';

let html = fs.readFileSync(htmlPath, 'utf8');
let eventsCode = `import { state } from './state.js';\n// Import all necessary functions here (to be manually added or handled in main.js)\n\nexport function initializeEventListeners() {\n`;

let idCounter = 1;

// Regex to match tags with onclick attributes
// This matches <tagName ... onclick="something" ... >
const tagRegex = /<([a-zA-Z0-9\-]+)([^>]*)onclick="([^"]+)"([^>]*)>/gi;

let matchCount = 0;
html = html.replace(tagRegex, (match, tagName, before, onclickCode, after) => {
    matchCount++;
    // Check if the tag already has an id
    const idMatch = (before + after).match(/id="([^"]+)"/);
    let id;
    let newBefore = before;
    let newAfter = after;

    if (idMatch) {
        id = idMatch[1];
    } else {
        id = `action-btn-${idCounter++}`;
        newBefore = ` id="${id}" ` + before;
    }

    eventsCode += `
    const el_${id.replace(/-/g, '_')} = document.getElementById('${id}');
    if (el_${id.replace(/-/g, '_')}) {
        el_${id.replace(/-/g, '_')}.addEventListener('click', function(event) {
            ${onclickCode}
        });
    }
`;
    // Return the tag without onclick, but with id if it was added
    return `<${tagName}${newBefore}${newAfter}>`;
});

eventsCode += `\n}\n`;

fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(eventsJsPath, eventsCode, 'utf8');

console.log(`Successfully replaced ${matchCount} onclick attributes.`);
