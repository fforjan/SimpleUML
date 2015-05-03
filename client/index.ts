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

function loadJumlyDocument(path: string): void {
    "use strict";

    var content: string = fs.readFileSync(getUserHome() + "/" + path);
    setJumlyDocumentContent(content);
}

function getUserHome(): string {
    "use strict";
    return process.env[(process.platform === "win32") ? "USERPROFILE" : "HOME"];
}

function getYumlyDocuments(): string[] {
    "use strict";

    var files: string[] = fs.readdirSync(getUserHome());

    var list: string[] = [];

    for ( var i: number = 0; i < files.length; i++) {
          var file: string = files[i];
          if (Documents.JumlyDocument.IsJumlyDocument(file)) {
              list.push(file);
          }
    }

    return list;
}

function setDocuments(): void {
    "use strict";
    var yumlyDocuments: string[] = getYumlyDocuments();

    for ( var i: number = 0; i < yumlyDocuments.length; i++) {
      var newFile: JQuery = $( "<div/>", {
      "class": "file",
      text: yumlyDocuments[i],
      onclick: "loadJumlyDocument(\"" + yumlyDocuments[i] + "\")"
      });

      newFile.insertBefore( $( "#lastFileAnchor" ) );
    }
}

$( document ).ready((): void => {
  setDocuments();
});
