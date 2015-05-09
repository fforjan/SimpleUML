"use strict";

// report crashes to our server.
require("crash-reporter").start();
import Application = require("./application/application");

var application: Application.Application = new Application.Application("file://" + __dirname + "/application/editor/index.html");

application.Start();
