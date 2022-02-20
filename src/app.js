"use strict";
exports.__esModule = true;
var express = require("express");
var helmet_1 = require("helmet");
var cors = require("cors");
var app = express();
app.use(express.json());
app.use(helmet_1["default"].contentSecurityPolicy({
    useDefaults: false,
    directives: {
        defaultSrc: ["'self'"]
    }
}));
app.use(cors());
exports["default"] = app;
