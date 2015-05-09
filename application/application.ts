///<reference path="../typings/node/node.d.ts" />
///<reference path="editor/index.ts" />

"use strict";

var app: any = require("app");  // module to control application life.
var BrowserWindow: any = require("browser-window");  // module to create native browser window.
var Menu: any = require("menu");
var clipboard: any = require("clipboard");  // module to control application life.
var ipc: any = require("ipc");

import aboutInfo  = require("./lib/aboutinfo");

/**
 * Application class - main process from electron.
 */
export class Application {

	private mainWindow: any;
	private startURI: string;

	/**
	 * Constructor
	 * @param startURI Uri to use when starting the application
	 */
	public constructor(startURI: string)
	{
		this.startURI  = startURI;
	}

	/**
	 * start the application itself.
	 */
	public Start(): void {

		this.mainWindow = null;

		// quit when all windows are closed.
		app.on("window-all-closed", () => this.WindowAllClose() );

		// this method will be called when Electron has done everything
		// initialization and ready for creating browser windows.
		app.on("ready", () => this.Ready() );
	}

	/**
	 * call back
	 */
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

		ipc.on("copyToClipboard", (event: any, rect: any) => {
				this.CopyToClipboard(rect);
			}
		);
	}

	private CopyToClipboard(rect: any): void {
		this.mainWindow.capturePage(rect, ( img: any) => clipboard.writeImage( img));
	}
	private BuildMenu(): void {

		var template: any = [
			{
				label: app.getName(),
				submenu: [
					{
						label: "Save",
						accelerator: "Command+S",
						click: (): void => { this.mainWindow.webContents.send("save"); }
					},
					{ type: "separator" },
					{
						label: "Quit",
						accelerator: "Command+Q",
						click: (): void => { app.quit(); }
					},
				]
			},
			{
				label: "Edit",
				submenu: [
					{
						label: "Update",
						accelerator: "Command+U",
						click: (): void => { this.mainWindow.webContents.send("update"); }
					},
					{
						label: "Copy to clipboard",
						click: (): void => { this.mainWindow.webContents.send("requestClipboardArea"); }
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
