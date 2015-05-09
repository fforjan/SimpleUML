/// <reference path="document.ts" />
module Documents {
	"use strict";

	export class MemoryDocument extends Documents.Document {

		private defaultContent: string;

		constructor(documentName: string, defaultContent: string) {
			super(documentName, "memorydocument://" + documentName);
			this.defaultContent = defaultContent;
		}

		public Save(): void {
			this.IsDirty = true;
		}

		public Load(): void {
			this.Content = this.defaultContent;
			this.IsDirty = false;
		}
	}
}
