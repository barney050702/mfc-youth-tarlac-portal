const fs = require('fs');

function removeElementById(html, id) {
    const startIndex = html.indexOf('id="' + id + '"');
    if (startIndex === -1) return html;
    
    // Find the opening <div that contains this id
    let startTag = html.lastIndexOf('<div', startIndex);
    if (startTag === -1) return html;
    
    let depth = 0;
    let i = startTag;
    
    while (i < html.length) {
        if (html.substring(i, i+4) === '<div') {
            depth++;
            i += 4;
        } else if (html.substring(i, i+6) === '</div>') {
            depth--;
            i += 6;
            if (depth === 0) {
                // Return string without this element
                return html.substring(0, startTag) + html.substring(i);
            }
        } else {
            i++;
        }
    }
    return html;
}

let html = fs.readFileSync('index.html', 'utf8');

const idsToRemove = [
    'modal-member-profile',
    'modal-member-qr-id',
    'modal-member-id-card',
    'modal-create-account',
    'modal-bulk-import',
    'modal-household-tree',
    'modal-download-all',
    'modal-hh-folder',
    'modal-cst-folder',
    'modal-funds-record',
    'modal-receipt-viewer'
];

idsToRemove.forEach(id => {
    html = removeElementById(html, id);
});

fs.writeFileSync('index.html', html);
console.log('Removed all specified modals successfully!');
