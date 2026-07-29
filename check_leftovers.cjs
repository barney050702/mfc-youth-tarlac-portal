const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'modules');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
let allExports = new Set();
files.forEach((f) => {
    const code = fs.readFileSync(path.join(dir, f), 'utf8');
    const regex = /export (?:function|const|let|var)\s+([a-zA-Z0-9_]+)/g;
    let match;
    while ((match = regex.exec(code))) {
        allExports.add(match[1]);
    }
});

const scriptPath = path.join(__dirname, 'script.js');
let code = fs.readFileSync(scriptPath, 'utf8');

const regex = /function\s+([a-zA-Z0-9_]+)\s*\(/g;
let match;
const funcsInScript = [];
while ((match = regex.exec(code))) {
    funcsInScript.push(match[1]);
}

const leftOvers = funcsInScript.filter((fn) => !allExports.has(fn));
console.log('Total leftovers:', leftOvers.length);
console.log('First 50 leftovers:', leftOvers.slice(0, 50).join(', '));
