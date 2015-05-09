///<reference path="../Typescript/node.d.ts" />
"use strict";

var app: any = require("app");  // module to control application life.
var BrowserWindow: any = require("browser-window");  // module to create native browser window.
var Menu: any = require("menu");

import aboutInfo  = require("./lib/aboutinfo");

export class Application {

	private mainWindow: any;
	private startURI: string;

	public constructor(startURI: string)
	{
		this.startURI  = startURI;
	}

	public Start(): void {

		this.mainWindow = null;

		// quit when all windows are closed.
		app.on("window-all-closed", () => this.WindowAllClose() );

		// this method will be called when Electron has done everything
		// initialization and ready for creating browser windows.
		app.on("ready", () => this.Ready() );
	}

	private WindowAllClose(): void {
		if (process.platform !== "darwin")
		{
			app.quit();
		}
	}

	private Ready(): void {
		// create the browser window.
		this.mainWindow = new BrowserWindow({width: 800, height: 800});

		this.BuildMenu();

		// and load the index.html of the app.
		this.mainWindow.loadUrl(this.startURI);

		// emitted when the window is closed.
		this.mainWindow.on("closed", () => {
			// dereference the window object, usually you would store windows
			// in an array if your app supports multi windows, this is the time
			// when you should delete the corresponding element.
			this.mainWindow = null;
		});
	}

	private BuildMenu(): void {

		var template: any = [
			{
				label: aboutInfo.AboutInfo.GetApplicationName(),
				submenu: [
					{
						label: "Quit",
						accelerator: "Command+Q",
						click: (): void => { app.quit(); }
					},
				]
			},
			{
				label: "Help",
				submenu: [
					{
						label: "Versions",
						click: (): void  => aboutInfo.AboutInfo.DisplayExtra(this.mainWindow)
					}
				]
			}];

		var menu: any = Menu.buildFromTemplate(template);
		Menu.setApplicationMenu(menu);
	}
}