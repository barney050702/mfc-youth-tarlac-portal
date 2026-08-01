const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/[ \t]*<div id="react-login-root"><\/div>\r?\n/g, '');
html = html.replace(/<\/body>/, '    <div id="react-login-root"></div>\n  </body>');
fs.writeFileSync('index.html', html);
console.log('Done');
