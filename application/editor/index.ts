"use strict";
///<reference path="../../Typescript/package.json.d.ts" />

import UmlEditor = require("./editor");

var editor: UmlEditor.UmlEditor;
var packageDescription: Package = require("../../package.json");

$( document ).ready((): void => {
  document.title = packageDescription.name;
  editor = new UmlEditor.UmlEditor();

  editor.setDocuments();
  
  // In renderer process (web page).
  var ipc = require("ipc");
  
  ipc.on("save", (arg) => {
    editor.saveDocument();
  });
 
  ipc.on("update", (arg) => {
   editor.renderJumlyDocument();
  });
  
  ipc.on("requestClipboardArea", (arg) => {
   editor.copyToClipboard();
  });
});