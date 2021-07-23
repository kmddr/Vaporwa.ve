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
   default: "Math.floor(Math.random() * 14)",
 })
 .option("m", { 
    alias: "mode", 
    describe: "Which mode to generate", 
    type: "string",
    default: "all",
  })
 .argv;

switch ( options.m ) {
  case "c" || "cover" || "covers":
    require("../bin/covers.js");
    break;
  case "t" || "tracks" || "track":
    
    break;
}