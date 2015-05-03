"use strict";

// report crashes to our server.
require("crash-reporter").start();
import Application = require("./server/application");

var application: Application.Application = new Application.Application("file://" + __dirname + "/client/index.html");

application.Start();
