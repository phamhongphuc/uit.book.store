'use strict';

import {
    app
} from 'electron';

import window from './index.window';

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', window);
app.on('ready', window);
