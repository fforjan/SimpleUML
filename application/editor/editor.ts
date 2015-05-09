///<reference path="../../typings/jquery/jquery.d.ts" />
///<reference path="../../Typescript/jumly.d.ts" />
///<reference path="../../Typescript/package.json.d.ts" />
///<reference path="../lib/jumlyDocument.ts" />
///<reference path="../lib/memoryDocument.ts" />
"use strict";

import Document = require("../lib/document");
import MemoryDocument = require("../lib/memoryDocument");
import JumlyDocument = require("../lib/jumlyDocument");

var ipc: any = require("ipc");
var packageDescription: Package = require("../../package.json");
var samples: { [id: string]: string; } = require("./sample.json");

/**
 * Class representing the Uml Editor controler
 */
export class UmlEditor {

  /**
   * Active document
   */
  private activeDocument: Document.Document;

  /**
   * Active UI Element, used to change the active state
   */
  private activeUIElement: JQuery;

  /**
   * Set the associated jumly document to the node as active.
   * Abut also set the node as the activeUIElement
   * @param node element to be active
   */
  public activateJumlyDocument(node: Element): void {

    if (this.activeUIElement !== undefined) {
        this.activeUIElement.removeClass("current");
    }

    this.activeUIElement = $(node);
    this.activeUIElement.addClass("current");

    this.activeDocument = this.activeUIElement.data("jumlyDocument");
    document.title = packageDescription.name + " - " + this.activeDocument.Name;
    this.activeDocument.Load();
    this.setJumlyDocumentContent();
  }

  /**
   * Save active document
   */
  public saveDocument(): void {
    this.activeDocument.Content = $("textarea#umlDocument").val();
    this.activeDocument.Save();
  }

  /**
   * set the current displayed document content as the active content.
   * Any modification is lost.
   */
  public  setJumlyDocumentContent(): void {
      $("textarea#umlDocument").val(this.activeDocument.Content);
      this.renderJumlyDocument();
  }

  /**
   * Set all documents into the document area.
   */
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

  /**
   * Render the currently displayed document content.
   */
  public renderJumlyDocument(): void {

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

  /** 
   * copy currently rendered image to the clipboard.
   * note : this will be asynchronous.
   */
  public copyToClipboard() {
    var boundingRect: ClientRect = document.getElementById("renderer").getBoundingClientRect();

    ipc.send("copyToClipboard",
      {
        "x": boundingRect.left,
        "y": boundingRect.top,
        "width": boundingRect.width,
        "height": 370 /** FIXME for some reasons height is not set correctly */
      });
  }

  /**
   * Get user home directory
   */
  private getUserHome(): string {
    return process.env[(process.platform === "win32") ? "USERPROFILE" : "HOME"];
  }

  /**
   * insert new document into the list of documents.
   * @param document document to be inserted
   */
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
}
