import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
    const wb = new Workbox('service-worker.js');
    wb.register();
}
