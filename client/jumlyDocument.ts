/// <reference path="document.ts" />
"use strict";

module Documents {
	
	var path: any = require('path');

	export class JumlyDocument extends Documents.Document {
		
		public constructor(filePath: string) {
			super(path.basename(filePath, JumlyDocument.extension), filePath);
		}
		
		public static get extension() :string {
			return ".jm";
		}
		public static IsJumlyDocument(filepath: string) {
			return filepath.indexOf(JumlyDocument.extension, filepath.length - JumlyDocument.extension.length) !== -1;
		}
		
		public static IdentifyJumlyDocuments(filepath: string): JumlyDocument[] {

		    var files: string[] = fs.readdirSync(filepath);
		
		    var list: JumlyDocument[] = [];
		
		    for ( var i: number = 0; i < files.length; i++) {
		          var file: string = path.join(filepath, files[i]);
				  if (Documents.JumlyDocument.IsJumlyDocument(file)) {
					  console.log("reading file " + file);
		              list.push(new JumlyDocument(file));
		          }
		    }
		
		    return list;
		}
	}
}