const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf-8').split('\n');
lines.forEach((l, i) => {
    if (l.toLowerCase().includes('modal-backdrop')) {
        console.log(`Line ${i + 1}: ${l.trim()}`);
    }
});
