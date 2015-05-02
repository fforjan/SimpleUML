///<reference path="Typescript/package.json.d.ts"/>

var dialog = require('dialog');
var package : Package = require('./package.json');

export class AboutInfo {
	public static DisplayExtra(window : any) {
		var msg : string = package.name + " " +  package.version ;
		var extra : string = "Electron version : " + process.versions['electron'];
		extra += "\nNode version : " + process.versions.node
		dialog.showMessageBox(window, { "type": "info", "message":msg, "detail": extra, "buttons": ["Close"]});
	}
}