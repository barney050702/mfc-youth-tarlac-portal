const { JSDOM, VirtualConsole } = require('jsdom');

const virtualConsole = new VirtualConsole();
virtualConsole.on('error', (err) => {
    console.error('JS ERROR:', err);
});
virtualConsole.on('jsdomError', (err) => {
    console.error('JSDOM ERROR:', err);
});
virtualConsole.on('log', (log) => {
    console.log('JS LOG:', log);
});

console.log('Loading page...');
JSDOM.fromURL('http://localhost:3000/mfc-youth-tarlac-portal/', {
    runScripts: 'dangerously',
    resources: 'usable',
    virtualConsole,
})
    .then((_dom) => {
        setTimeout(() => {
            console.log('Finished waiting 5 seconds.');
            process.exit(0);
        }, 5000);
    })
    .catch((err) => {
        console.error('Failed to load:', err);
    });
