const { app, BrowserWindow } = require('electron');

//Declare mainWindow in the global scope so it is not garbage collected while still needed
let mainWindow = null;

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 400,
		height: 600,
		show: false
	});

	//To avoid flash of emptiness before page loads, only show the window after contents have loaded.
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	})

	mainWindow.on('closed', () => {
		mainWindow = null;
	})

	mainWindow.loadURL(`file://${__dirname}/index.html`);
});