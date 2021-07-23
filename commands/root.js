#!/usr/bin/env node
const chalk = require("chalk");
const yargs = require("yargs");

const options = yargs
 .usage("Usage: -p <path> -m <mode>")
 .option("p", {
    alias: "path",
    describe: "Where to create album files",
    type: "string",
    demandOption: true,
 })
 .option("count", {
   describe: "How many tracks to generate",
   type: "number",
   default: "random",
 })
 .option("m", { 
    alias: "mode", 
    describe: "Which mode to generate", 
    type: "string",
    default: "all",
  })
 .argv;

 console.log(options.m);
switch ( options.m ) {
  case "a" || "all":
    require("index.js");
    console.log("x");
    break;
  case "c" || "cover" || "covers":
    _generateCover(options.p);
    break;
  case "t" || "track" || "tracks":
    _generateTracks(options.p, options.count);
    break;
}