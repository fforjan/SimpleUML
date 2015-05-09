/// <reference path="document.ts" />
"use strict";

import Documents = require("./document");

var fs: any = require("fs");
var path: any = require("path");

export class JumlyDocument extends Documents.Document {

	public constructor(filePath: string) {
		super(path.basename(filePath, JumlyDocument.extension), filePath);
	}

	public static get extension(): string {
		return ".jm";
	}

	public static IsJumlyDocument(filepath: string): boolean {
		return filepath.indexOf(JumlyDocument.extension, filepath.length - JumlyDocument.extension.length) !== -1;
	}

	public static IdentifyJumlyDocuments(filepath: string): JumlyDocument[] {

		var files: string[] = fs.readdirSync(filepath);

		var list: JumlyDocument[] = [];

		for ( var i: number = 0; i < files.length; i++) {
			var file: string = path.join(filepath, files[i]);
			if (JumlyDocument.IsJumlyDocument(file)) {
				list.push(new JumlyDocument(file));
			}
		}

		return list;
	}
}
