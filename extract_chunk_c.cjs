const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'script.js');
let code = fs.readFileSync(scriptPath, 'utf8');

function extractFunction(code, funcName) {
    const regex = new RegExp(`function\\s+${funcName}\\s*\\([^)]*\\)\\s*\\{`, 'g');
    const match = regex.exec(code);
    if (!match) return null;
    
    let startIndex = match.index;
    let index = startIndex + match[0].length;
    let braceCount = 1;
    
    while (braceCount > 0 && index < code.length) {
        if (code[index] === '{') braceCount++;
        if (code[index] === '}') braceCount--;
        index++;
    }
    
    const funcCode = code.substring(startIndex, index);
    return { funcCode, startIndex, endIndex: index };
}

// Read current state of script
code = fs.readFileSync(scriptPath, 'utf8');

// Find all remaining functions
const regex = /function\s+([a-zA-Z0-9_]+)\s*\(/g;
let match;
const funcsInScript = [];
while (match = regex.exec(code)) {
    funcsInScript.push(match[1]);
}

// Find what's already exported in modules
const dir = path.join(__dirname, 'src', 'modules');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
let allExports = new Set();
files.forEach(f => {
    const codeContent = fs.readFileSync(path.join(dir, f), 'utf8');
    const r = /export (?:function|const|let|var)\s+([a-zA-Z0-9_]+)/g;
    let m;
    while (m = r.exec(codeContent)) {
        allExports.add(m[1]);
    }
});

const leftOvers = funcsInScript.filter(fn => !allExports.has(fn));

let extractedCode = [];
let exportsList = [];

for (const funcName of leftOvers) {
    const result = extractFunction(code, funcName);
    if (result) {
        extractedCode.push(`export ${result.funcCode}`);
        exportsList.push(funcName);
        
        const emptyLines = '\n'.repeat((result.funcCode.match(/\n/g) || []).length);
        code = code.substring(0, result.startIndex) + `/* Extracted: ${funcName} */` + emptyLines + code.substring(result.endIndex);
    }
}

fs.writeFileSync(scriptPath, code);

const outputFilePath = path.join(__dirname, 'src', 'modules', 'legacy.js');
const newContent = 'import { state, saveToStorage, notifyStateChange } from "./state.js";\nimport { showToast, triggerHaptic } from "./ui.js";\nimport { MFCFirebaseCloud } from "./firebase.js";\n\n' + extractedCode.join('\n\n');
fs.writeFileSync(outputFilePath, newContent);

// Update main.js
const mainPath = path.join(__dirname, 'src', 'main.js');
let mainCode = fs.readFileSync(mainPath, 'utf8');

let importStatements = `\nimport * as Legacy from './modules/legacy.js';\n`;
let windowBindings = '';
for (const fn of exportsList) {
    windowBindings += `    window.${fn} = window.${fn} || Legacy.${fn};\n`;
}

mainCode = mainCode.replace("document.addEventListener('DOMContentLoaded', () => {", importStatements + "\ndocument.addEventListener('DOMContentLoaded', () => {");
const injectTarget = "    // Dashboard & Reports exports\n    window.renderAnalytics = window.renderAnalytics || renderAnalytics;";
mainCode = mainCode.replace(injectTarget, "    // Chunk C (Legacy) Exports\n" + windowBindings + "\n" + injectTarget);
fs.writeFileSync(mainPath, mainCode);

console.log('Successfully extracted', exportsList.length, 'functions to legacy.js');
