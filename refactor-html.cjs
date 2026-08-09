const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startMarker = '<!-- Mobile Sidebar Backdrop -->';
const endMarker = '<!-- MODAL: DOWNLOAD ALL MANUALS -->';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex > -1 && endIndex > -1) {
    // Replace the top part
    html = html.substring(0, startIndex) + '<div id="root"></div>\n\n                    ' + html.substring(endIndex);
    
    // Also remove the extra closing divs at the very end
    // They look like:
    //                 </div>
    //             </div>
    //         </div>
    // 
    //         <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    
    html = html.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<script src="https:\/\/cdnjs\.cloudflare\.com/, '<script src="https://cdnjs.cloudflare.com');
    
    fs.writeFileSync('index.html', html);
    console.log('Successfully refactored index.html structure.');
} else {
    console.log('Could not find markers. start:', startIndex, 'end:', endIndex);
}
