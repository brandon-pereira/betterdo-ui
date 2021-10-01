import { Workbox } from 'workbox-window';
import.meta.hot;

if (
    'serviceWorker' in navigator &&
    __SNOWPACK_ENV__.NODE_ENV === 'production'
) {
    const wb = new Workbox('service-worker.js');
    wb.register();
}
