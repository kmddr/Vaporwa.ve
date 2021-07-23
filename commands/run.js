#!/usr/bin/env node
const chalk = require("chalk");
let bfore = Date.now();
let pjson = require('../package.json');
console.log(chalk.gray("==========================================="));
console.log("vaporwa.ve@" + pjson.version + ": vapor-run");
console.log(chalk.red("Error 0: Command deprecated"));
console.log(chalk.red("Use \"vaporwa-ve run\" to run the bot"));
console.log(chalk.red("Command failed, " + (Date.now() - bfore) + " ms"));
console.log(chalk.gray("==========================================="));

/*
class Main {
    int main() {
        cout >> "fuck";
        return 0;
    }
}*/