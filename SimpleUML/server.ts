"use strict";

// report crashes to our server.
require("crash-reporter").start();
import Application = require("./application");

var application: Application.Application = new Application.Application();

application.Start();
