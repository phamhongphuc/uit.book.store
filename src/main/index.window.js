import { BrowserWindow } from 'electron';

const staticUrl = `file://${__dirname}/index.html`;
const serverUrl = `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`;
const isDevelopment = process.env.NODE_ENV === 'production';

let window = null;

export default function createWindow() {
    if (window != null) return;
    window = new BrowserWindow({
        width: 1100,
        height: 700,
        'min-height': 300,
        'min-width': 300,
    });
    window.loadURL(isDevelopment ? staticUrl : serverUrl);
    window.on('closed', () => (window = null));

    //  Install `vue-devtools`
    if (process.env.NODE_ENV === 'development') {
        window.webContents.openDevTools();
        window.webContents.on('devtools-opened', () => setImmediate(() => window.focus()));

        const installExtension = require('electron-devtools-installer');
        installExtension
            .default(installExtension.VUEJS_DEVTOOLS)
            .then(name => console.log(`Added Extension: ${name}`))
            .catch(err => console.log('Unable to install `vue-devtools`: \n', err));
        require('devtron').install();
    }

    return window;
}
