"use strict";
exports.__esModule = true;
var express = require("express");
var helmet_1 = require("helmet");
var app = express();
app.use(helmet_1["default"].contentSecurityPolicy({
    useDefaults: false,
    directives: {
        defaultSrc: ["'self'"]
    }
}));
/*
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
*/
app.use(express.json());
exports["default"] = app;
