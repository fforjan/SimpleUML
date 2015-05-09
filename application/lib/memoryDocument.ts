
import Documents = require("./document");

"use strict";

export class MemoryDocument extends Documents.Document {

	private defaultContent: string;

	constructor(documentName: string, defaultContent: string) {
		super(documentName, "memorydocument://" + documentName);
		this.defaultContent = defaultContent;
	}

	public Save(): void {
		this.isDirty = true;
	}

	public Load(): void {
		this.Content = this.defaultContent;
		this.isDirty = false;
	}
}