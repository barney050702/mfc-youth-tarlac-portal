const fs = require('fs');

function removeElementById(html, id) {
    let startIndex = html.indexOf('id="' + id + '"');
    if (startIndex === -1) {
        startIndex = html.indexOf("id='" + id + "'");
        if (startIndex === -1) return html;
    }

    // Find the opening <div that contains this id
    let startTag = html.lastIndexOf('<div', startIndex);
    if (startTag === -1) return html;

    let depth = 0;
    let i = startTag;

    while (i < html.length) {
        if (html.substring(i, i + 4) === '<div') {
            depth++;
            i += 4;
        } else if (html.substring(i, i + 6) === '</div>') {
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

function removeAllElementsById(html, id) {
    let oldHtml = '';
    while (html !== oldHtml) {
        oldHtml = html;
        html = removeElementById(html, id);
    }
    return html;
}

let html = fs.readFileSync('index.html', 'utf8');

const idsToRemove = [
    'modal-command-palette',
    'modal-keyboard-cheatsheet',
    'whats-new-modal-backdrop',
    'create-account-backdrop',
    'modal-funds-backdrop',
];

idsToRemove.forEach((id) => {
    html = removeAllElementsById(html, id);
});

fs.writeFileSync('index.html', html);
console.log('Removed specified modals from index.html successfully!');
