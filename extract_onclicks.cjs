const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const onclicks = new Set();
const regex = /onclick="([^"]+)"/g;
let match;
while ((match = regex.exec(html)) !== null) {
    onclicks.add(match[1].trim());
}
console.log(Array.from(onclicks).join('\n'));
