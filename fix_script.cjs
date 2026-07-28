const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');
let lines = code.split('\n');
let head = lines.slice(0, 9252).join('\n');
let tail = lines.slice(9252).join('\n');

tail = tail.replace(/exportMembersCSV/g, 'exportMembersCSV_V2');
tail = tail.replace(/printMemberIDCard/g, 'printMemberIDCard_V2');
tail = tail.replace(/openQRScannerModal/g, 'openQRScannerModal_V2');
tail = tail.replace(/closeQRScannerModal/g, 'closeQRScannerModal_V2');
tail = tail.replace(/closeCertificateModal/g, 'closeCertificateModal_V2');

const printGenBlock = `function printGeneratedLetter() {
    window.print();
}
window.printGeneratedLetter = printGeneratedLetter;`;

// Find all indices of printGenBlock
let firstIdx = tail.indexOf(printGenBlock);
if (firstIdx !== -1) {
    let nextIdx = tail.indexOf(printGenBlock, firstIdx + printGenBlock.length);
    if (nextIdx !== -1) {
        // Remove the second occurrence
        tail = tail.substring(0, nextIdx) + tail.substring(nextIdx + printGenBlock.length);
    }
}

fs.writeFileSync('script.js', head + '\n' + tail);
