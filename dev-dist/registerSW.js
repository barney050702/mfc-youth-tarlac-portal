if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('/mfc-youth-tarlac-portal/dev-sw.js?dev-sw', {
        scope: '/mfc-youth-tarlac-portal/',
        type: 'classic',
    });
