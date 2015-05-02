var BrowserWindow = require('browser-window');  // Module to create native browser window.
var app = require('app');  // Module to control application life.
var dialog = require('dialog');
//var remote = require('remote');
var Menu = require('menu');

// Report crashes to our server.
require('crash-reporter').start();

class Application {

	private mainWindow : any;
	
	constructor() {
	
		this.mainWindow = null;
			
		// Quit when all windows are closed.
		app.on('window-all-closed', () => this.WindowAllClose() );

		// This method will be called when Electron has done everything
		// initialization and ready for creating browser windows.
		app.on('ready', () => this.Ready() );
	}	
	
	public WindowAllClose() {
		if (process.platform != 'darwin')
    		app.quit();
	}
	
	public Ready() {
		// Create the browser window.
  		this.mainWindow = new BrowserWindow({width: 800, height: 600});
		  
		this.BuildMenu();

  		// and load the index.html of the app.
  		this.mainWindow.loadUrl('file://' + __dirname + '/index.html');

  		// Emitted when the window is closed.
  		this.mainWindow.on('closed', function() {
		    // Dereference the window object, usually you would store windows
		    // in an array if your app supports multi windows, this is the time
		    // when you should delete the corresponding element.
		    this.mainWindow = null;
  		});
	}
	
	public DisplayExtra() {
		dialog.showMessageBox(this.mainWindow, { "type": "info", "message":"hello world", "buttons": ["Close"]});
	}
	
	public BuildMenu() {
	
		var template = [
			{
			label: 'Electron',
			submenu: [
			  {
			    label: 'About Electron',
			    selector: 'orderFrontStandardAboutPanel:'
			  },  
			]},
			{
				label: 'Help',
				submenu: [
					{ label:'extra',
				 	click: () => this.DisplayExtra()
					}
				]
			}];
		
		var menu = Menu.buildFromTemplate(template);	
		Menu.setApplicationMenu(menu); // Must be called within app.on('ready', function(){ ... });
	}
}

new Application();