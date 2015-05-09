///<reference path="../../typings/jquery/jquery.d.ts" />
///<reference path="../../Typescript/jumly.d.ts" />
///<reference path="../../Typescript/package.json.d.ts" />
///<reference path="../lib/jumlyDocument.ts" />
///<reference path="../lib/memoryDocument.ts" />
"use strict";

import Document = require("../lib/document");
import MemoryDocument = require("../lib/memoryDocument");
import JumlyDocument = require("../lib/jumlyDocument");

/* tslint:disable:no-unused-variable */

var fs: any = require("fs");
var packageDescription: Package = require("../../package.json");
var samples: { [id: string]: string; } = require("./sample.json");

class UmlEditor {

  private activeDocument: Document.Document;

  public activateJumlyDocument(node: Element): void {
    this.activeDocument = $(node).data("jumlyDocument");
    document.title = packageDescription.name + " - " + this.activeDocument.Name;
    this.activeDocument.Load();
    this.setJumlyDocumentContent();
  }

  public saveDocument(): void {
    this.activeDocument.Content = $("textarea#umlDocument").val();
    this.activeDocument.Save();
  }

  public  setJumlyDocumentContent(): void {
      $("textarea#umlDocument").val(this.activeDocument.Content);
      this.renderJumlyDocument();
  }

  public setDocuments(): void {
    for (var id in samples) {
       if (samples.hasOwnProperty(id)) {
         this.insertDocument( new MemoryDocument.MemoryDocument(id, samples[id]));
       }
    }

    var jumlyDocuments: JumlyDocument.JumlyDocument[] = JumlyDocument.JumlyDocument.IdentifyJumlyDocuments(this.getUserHome());

    for ( var i: number = 0; i < jumlyDocuments.length; i++) {
      this.insertDocument(jumlyDocuments[i]);
    }
  }

  private getUserHome(): string {
    return process.env[(process.platform === "win32") ? "USERPROFILE" : "HOME"];
  }

  private insertDocument(document: Document.Document): void
  {
      var newFile: JQuery = $( "<div/>", {
        "class": "file",
        text: document.Name,
        onclick: "editor.activateJumlyDocument(this)"
      });

      newFile.data("jumlyDocument", document);

      newFile.insertBefore( $( "#lastFileAnchor" ) );
  }

  private renderJumlyDocument(): void {

    $("div#status").text("ok");
    try {
      this.activeDocument.Content = $("textarea#umlDocument").val();
      JUMLY.eval($("textarea#umlDocument"), {
        into: $("div#renderer")
      });
/* tslint:disable:typedef issue with exception */
    } catch (_error) {
/* tslint:disable:typedef */
      var ex: any = _error;
      $("div#status").text(ex);
    }
  }
}

var editor: UmlEditor;

$( document ).ready((): void => {
  document.title = packageDescription.name;
  editor = new UmlEditor();

  editor.setDocuments();
});
