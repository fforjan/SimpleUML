///<reference path="Typescript/jquery.d.ts" />
///<reference path="Typescript/jumly.d.ts" />
"use strict";

/* tslint:disable:no-unused-variable */

/* tslint:disable:max-line-length */
var sample1: string = "@found \"User\", ->\n  @message \"search\", \"Browser\", ->\n    @create asynchronous:\"connection\", \"Web Server\"\n    @message \"GET\", \"Web Server\", ->\n      @message \"find the resource\", -> @reply \"\"\n    @reply \"\", \"User\"";
var sample2: string = "@found \"You\", ->\n  @alt\n    \"[found]\": ->\n      @loop ->\n        @message \"request\", \"HTTP Server\"\n        @note \"NOTE: This doesn\'t make sense :)\"\n    \"[missing]\": ->\n      @message \"new\", \"HTTP Session\"\n  @ref \"respond resource\"";

/* tslint:enable:max-line-length */

function updateJumly(): void {
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

function loadDocument(document: string): void {
    "use strict";

      $("textarea#umlDocument").val(document);
      updateJumly();
    };
