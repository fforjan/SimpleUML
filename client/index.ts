///<reference path="../Typescript/jquery.d.ts" />
///<reference path="../Typescript/jumly.d.ts" />

"use strict";

/* tslint:disable:no-unused-variable */

/* tslint:disable:max-line-length */
var sample1: string = "@found \"User\", ->\n  @message \"search\", \"Browser\", ->\n    @create asynchronous:\"connection\", \"Web Server\"\n    @message \"GET\", \"Web Server\", ->\n      @message \"find the resource\", -> @reply \"\"\n    @reply \"\", \"User\"";
var sample2: string = "@found \"You\", ->\n  @alt\n    \"[found]\": ->\n      @loop ->\n        @message \"request\", \"HTTP Server\"\n        @note \"NOTE: This doesn\'t make sense :)\"\n    \"[missing]\": ->\n      @message \"new\", \"HTTP Session\"\n  @ref \"respond resource\"";

var fs: any = require("fs");

/* tslint:enable:max-line-length */

function renderJumlyDocument(): void {
    "use strict";

       $("div#status").text("ok");
      try {
        JUMLY.eval($("textarea#umlDocument"), {
          into: $("div#renderer")
        });
     } catch (_error ) {
        var ex: any = _error;
        $("div#status").text(ex);
     }
    };

function setJumlyDocumentContent(document: string): void {
    "use strict";

      $("textarea#umlDocument").val(document);
      renderJumlyDocument();
};

function loadJumlyDocument(node: JQuery): void {
   "use strict";
    var attachDocument: Documents.JumlyDocument = jQuery.data( document.body, "jumlyDocument");
    attachDocument.Load();
    setJumlyDocumentContent(attachDocument.Content);
}

function getUserHome(): string {
    "use strict";
    return process.env[(process.platform === "win32") ? "USERPROFILE" : "HOME"];
}

function setDocuments(): void {
    "use strict";

    var jumlyDocuments: Documents.JumlyDocument[] = Documents.JumlyDocument.IdentifyJumlyDocuments(getUserHome());

    for ( var i: number = 0; i < jumlyDocuments.length; i++) {
      var newFile: JQuery = $( "<div/>", {
      "class": "file",
      text: jumlyDocuments[i].Name,
      onclick: "loadJumlyDocument(this)"
      });

      jQuery.data( document.body, "jumlyDocument", jumlyDocuments[i] );

      newFile.insertBefore( $( "#lastFileAnchor" ) );
    }
}

$( document ).ready((): void => {
  setDocuments();
});
