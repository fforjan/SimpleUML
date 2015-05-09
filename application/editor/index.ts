"use strict";
///<reference path="../../Typescript/package.json.d.ts" />

import UmlEditor = require("./editor");

var editor: UmlEditor.UmlEditor;
var packageDescription: Package = require("../../package.json");

$( document ).ready((): void => {
  document.title = packageDescription.name;
  editor = new UmlEditor.UmlEditor();

  editor.setDocuments();

  var ipc: any = require("ipc");

  ipc.on("save", () => {
    editor.saveDocument();
  });

  ipc.on("update", () => {
    editor.renderJumlyDocument();
  });

  ipc.on("requestClipboardArea", () => {
    editor.copyToClipboard();
  });
});
