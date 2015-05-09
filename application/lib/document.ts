/// <reference path="../../typings/node/node.d.ts" />

var fs: any = require("fs");

"use strict";

export class Document {

	protected isDirty: boolean;

	private path: string;
	private documentName: string;
	private content: string;

	public constructor(documentName: string, documentPath: string) {
		this.path = documentPath;
		this.documentName = documentName;
	}

	public get Name(): string {
		return this.documentName;
	}

	public get IsDirty(): boolean {
		return this.isDirty;
	}

	public get Content(): string {
		return this.content;
	}

/* tslint:disable:typedef issue with setter */
	public set Content(newContent: string) {
/* tslint:disable:typedef */
		this.content = newContent;
		this.isDirty = true;
	}

	public Load(): void {
		this.content = fs.readFileSync(this.path);
		this.isDirty = false;
	}

	public Save(): void {
		fs.writeFileSync(this.path, this.content);
		this.isDirty = false;
	}
}
