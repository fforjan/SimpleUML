///<reference path="../Typescript/jquery.d.ts" />
///<reference path="../Typescript/jumly.d.ts" />

"use strict";

/* tslint:disable:no-unused-variable */

/* tslint:disable:max-line-length */
var sample1: string = "@found \"User\", ->\n  @message \"search\", \"Browser\", ->\n    @create asynchronous:\"connection\", \"Web Server\"\n    @message \"GET\", \"Web Server\", ->\n      @message \"find the resource\", -> @reply \"\"\n    @reply \"\", \"User\"";
var sample2: string = "@found \"You\", ->\n  @alt\n    \"[found]\": ->\n      @loop ->\n        @message \"request\", \"HTTP Server\"\n        @note \"NOTE: This doesn\'t make sense :)\"\n    \"[missing]\": ->\n      @message \"new\", \"HTTP Session\"\n  @ref \"respond resource\"";

var fs: any = require("fs");

var activeDocument: Documents.JumlyDocument = undefined;

/* tslint:enable:max-line-length */

function renderJumlyDocument(): void {
    "use strict";

       $("div#status").text("ok");
      try {
        activeDocument.Content = $("textarea#umlDocument").val();
        JUMLY.eval($("textarea#umlDocument"), {
          into: $("div#renderer")
        });
     } catch (_error ) {
        var ex: any = _error;
        $("div#status").text(ex);
     }
    };

function setJumlyDocumentContent(): void {
    "use strict";

      $("textarea#umlDocument").val(activeDocument.Content);
      renderJumlyDocument();
};

function activatedJumlyDocument(node: JQuery): void {
   "use strict";
    activeDocument = jQuery.data( document.body, "jumlyDocument");
    activeDocument.Load();
    setJumlyDocumentContent();
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
      onclick: "activatedJumlyDocument(this)"
      });

      jQuery.data( document.body, "jumlyDocument", jumlyDocuments[i] );

      newFile.insertBefore( $( "#lastFileAnchor" ) );
    }
}

$( document ).ready((): void => {
  setDocuments();
});
