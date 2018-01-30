/**
 * @fileoverview janitor&#39;s favourites
 * @author janitor
 */
"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var requireIndex = require("requireindex");
var path = require("path");

// ------------------------------------------------------------------------------
// Plugin Definition
// ------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(path.join(__dirname, "/rules"));
