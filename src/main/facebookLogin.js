import { ipcMain, BrowserWindow } from 'electron';
import fb from 'fb';

export default function(main) {
    ipcMain.on('facebook login', function(event, arg) {
        var options = {
            client_id: '1702779546503699',
            scopes: 'public_profile',
            redirect_uri: 'https://www.facebook.com/connect/login_success.html',
        };
        var facebookAuthURL = `https://www.facebook.com/v2.8/dialog/oauth?client_id=${options.client_id}&redirect_uri=${
            options.redirect_uri
        }&response_type=token,granted_scopes&scope=${options.scopes}&display=popup`;

        var authWindow = new BrowserWindow({
            width: 450,
            height: 300,
            show: false,
            parent: main,
            modal: true,
            webPreferences: { nodeIntegration: false },
        });
        authWindow.on('closed', () => (authWindow = null));
        authWindow.loadURL(facebookAuthURL);
        authWindow.show();
        authWindow.webContents.on('did-get-redirect-request', function(authEvent, oldUrl, newUrl) {
            var raw_code = /access_token=([^&]*)/.exec(newUrl) || null;
            var access_token = raw_code && raw_code.length > 1 ? raw_code[1] : null;
            var error = /\?error=(.+)$/.exec(newUrl);
            console.log(access_token);
            event.returnValue = access_token;
            authWindow.close();
        });
    });
}
