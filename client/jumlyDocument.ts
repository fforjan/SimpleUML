/// <reference path="document.ts" />

module Documents {

	export class JumlyDocument extends Documents.Document {
		
		public static get extension() :string {
			return ".jm";
		}
		public static IsJumlyDocument(path: string) {
			return path.indexOf(JumlyDocument.extension, path.length - JumlyDocument.extension.length) !== -1;
		}
	}
}