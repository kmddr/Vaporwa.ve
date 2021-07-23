#!/usr/bin/env node
const chalk = require("chalk");
let bfore = Date.now();
let pjson = require('../package.json');
console.log(chalk.gray("==========================================="));
console.log("vaporwa.ve@" + pjson.version + ": vapor-test");
console.log(chalk.green("Command sucessful, " + (Date.now() - bfore) + " ms"));
console.log(chalk.gray("==========================================="));