///<reference path="Typescript/package.json.d.ts"/>

var dialog = require('dialog');
var package : Package = require('./package.json');

export class AboutInfo {
	
	public static DisplayExtra(window : any) {
		var msg = package.name + " " +  package.version + "\n" + process.versions['electron'];
		dialog.showMessageBox(window, { "type": "info", "message":msg, "buttons": ["Close"]});
	}
}