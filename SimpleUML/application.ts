///<reference path="Typescript/node.d.ts" />

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var Menu = require('menu');

import aboutInfo  = require('./aboutinfo');

export class Application {

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
	
	public BuildMenu() {
	
		var template = [
			{
			submenu: [
			  {
			    label: 'Quit',
			    accelerator: 'Command+Q',
        		click: () => { app.quit(); }
			  },  
			]},
			{
				label: 'Help',
				submenu: [
					{ 
						label:'Versions',
				 		click: () => aboutInfo.AboutInfo.DisplayExtra(this.mainWindow)
					}
				]
			}];
		
		var menu = Menu.buildFromTemplate(template);	
		Menu.setApplicationMenu(menu); // Must be called within app.on('ready', function(){ ... });
	}
}