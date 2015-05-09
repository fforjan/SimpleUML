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

/* tslint:disable:max-line-length */
var sample1: string = "@found \"User\", ->\n  @message \"search\", \"Browser\", ->\n    @create asynchronous:\"connection\", \"Web Server\"\n    @message \"GET\", \"Web Server\", ->\n      @message \"find the resource\", -> @reply \"\"\n    @reply \"\", \"User\"";
var sample2: string = "@found \"You\", ->\n  @alt\n    \"[found]\": ->\n      @loop ->\n        @message \"request\", \"HTTP Server\"\n        @note \"NOTE: This doesn\'t make sense :)\"\n    \"[missing]\": ->\n      @message \"new\", \"HTTP Session\"\n  @ref \"respond resource\"";
/* tslint:enable:max-line-length */

var fs: any = require("fs");
var packageDescription: Package = require("../../package.json");

var activeDocument: Document.Document = undefined;


function renderJumlyDocument(): void {
    "use strict";

    $("div#status").text("ok");
    try {
      activeDocument.Content = $("textarea#umlDocument").val();
      JUMLY.eval($("textarea#umlDocument"), {
        into: $("div#renderer")
      });
/* tslint:disable:typedef issue with exception */
    } catch (_error) {
/* tslint:disable:typedef */
      var ex: any = _error;
      $("div#status").text(ex);
   }
};

function saveDocument(): void {
    "use strict";
    activeDocument.Content = $("textarea#umlDocument").val();
    activeDocument.Save();
}

function setJumlyDocumentContent(): void {
    "use strict";

    $("textarea#umlDocument").val(activeDocument.Content);
    renderJumlyDocument();
};

function activatedJumlyDocument(node: Element): void {
    "use strict";
    activeDocument = $(node).data("jumlyDocument");
    document.title = packageDescription.name + " - " + activeDocument.Name;
    activeDocument.Load();
    setJumlyDocumentContent();
}

function getUserHome(): string {
    "use strict";
    return process.env[(process.platform === "win32") ? "USERPROFILE" : "HOME"];
}

function insertDocument(document: Document.Document)
{
    "use strict";
    var newFile: JQuery = $( "<div/>", {
      "class": "file",
      text: document.Name,
      onclick: "activatedJumlyDocument(this)"
    });

    newFile.data("jumlyDocument", document);

    newFile.insertBefore( $( "#lastFileAnchor" ) );
}

function setDocuments(): void {
    "use strict";

    insertDocument( new MemoryDocument.MemoryDocument("Sample 1", sample1));
    insertDocument( new MemoryDocument.MemoryDocument("Sample 2", sample2));

    var jumlyDocuments: JumlyDocument.JumlyDocument[] = JumlyDocument.JumlyDocument.IdentifyJumlyDocuments(getUserHome());

    for ( var i: number = 0; i < jumlyDocuments.length; i++) {
      insertDocument(jumlyDocuments[i]);
    }
}

$( document ).ready((): void => {
  setDocuments();
  document.title = packageDescription.name;
});
