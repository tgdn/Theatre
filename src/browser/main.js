'use strict'

var app = require('app');
var BrowserWindow = require('browser-window');
var path = require('path');
var ipc = require('ipc');
var dialog = require('dialog');

require('crash-reporter').start();

var mainWin = null;

// application

app.on('window-all-closed', function() {
    // quit when all windows closed on all platforms
    app.quit();
});

var onopen = function (e, lnk) {
  e.preventDefault()

  if (ready) {
    mainWin.send('add-to-playlist', [].concat(lnk))
    return
  }

  link = lnk
}

app.on('open-file', onopen)
app.on('open-url', onopen)

var frame = process.platform === 'win32';

app.on('ready', function() {

    mainWin = new BrowserWindow({
        width: 1000,
        height: 750,
        "min-width": 835,
        "min-height": 500,
        "dark-theme": true,
        "enable-larger-than-screen": false,
        title: "Theatre",
        center: true,
        frame: frame,
        transparent: false,
        //transparent: !frame,
        show: false,
    });

    mainWin.loadUrl(path.join('file://', __dirname, '..', 'index.html'));
    mainWin.openDevTools();

    mainWin.on('closed', function() {
        mainWin = null;
    });

    ipc.on('close', function() {
        app.quit();
    });

    ipc.on('open-file-dialog', function () {
        var files = dialog.showOpenDialog({ properties: [ 'openFile', 'multiSelections' ]})
        if (files) mainWin.send('add-to-playlist', files)
    });

    ipc.on('minimize', function() {
        mainWin.minimize();
    });

    ipc.on('maximize', function() {
        mainWin.maximize();
    });

    ipc.on('enter-full-screen', function() {
        mainWin.setFullScreen(true);
    });

    ipc.on('exit-full-screen', function() {
        mainWin.setFullScreen(false);
    });

    ipc.on('ready', function() {
        mainWin.show();
    });

});
