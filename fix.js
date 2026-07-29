const fs = require('fs');
let script = fs.readFileSync('script.js', 'utf8');
script = script.replace(/onclick="openDigitalQRModal/g, 'onclick="window.openDigitalQRModal');
fs.writeFileSync('script.js', script);
