import { Workbox } from 'workbox-window';

import { isProduction } from '@utilities/env';

if ('serviceWorker' in navigator && isProduction) {
    const wb = new Workbox('service-worker.js');
    wb.register();
}
