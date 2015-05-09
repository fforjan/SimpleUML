///<reference path="../../Typescript/package.json.d.ts"/>
"use strict";

var dialog: any = require("dialog");
var app: any = require("app");

export class AboutInfo {
	public static DisplayExtra(window: any): void {
		var msg: string = app.getName() + " " +  app.getVersion() ;

		/* tslint:disable:no-string-literal  */
		var extra: string = "Electron version : " + process.versions["electron"];
		/* tslint:enable:no-string-literal  */
		extra += "\nNode version : " + process.versions.node;
		dialog.showMessageBox(window, { "type": "info", "message": msg, "detail": extra, "buttons": [ "Close" ]});
	}
}
