#!/usr/bin/env node
// 2021 Vaporwa.ve
const yargs = require("yargs");
// Define the YARGS stuff
const options = yargs
  .usage("Usage: -hex <hex code> -ids <list> -albumname <name>")
  .example("covers --hex ffa3c7", "Creates a cover with a background of #ffa3c7")
  .example("covers --ids 362", "Creates a cover with the first painting, the sixth addon, and the second statue")
  .example("covers --ids ?1?", "Creates a cover with the first addon")
  .example("covers --an \"FLORAL SHOPPE\"", "Creates a cover with a title of \"FLORAL SHOPPE\"")
  .option("hex", { alias: "h", describe: "The hex code of a background. Don't include the hashtag.", type: "string", })
  .option("ids", { alias: "i", describe: "The IDs used for the images (such as statues)", type: "string", })
  .option("albumname", { alias: "an", describe: "The name of the album. Used on the cover", type: "string", }).argv;
// Generate the image
const SIZE = 1400;
// Init stuffs
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const chalk = require("chalk");
const _names = require("./names.js");
const { __error, _appendImages, _appendText, convertToFullwidth } = require("./functions.js");
let fw = convertToFullwidth;
// Canvas init
let _canvas = createCanvas(SIZE, SIZE);
let ctx = _canvas.getContext("2d");
// Get how many files are in each dir
let folders = [ "paintings", "etc", "statues"];
let lengths = []; let images = [];
let ids; (options.ids !== undefined) ? ids = options.ids.split("") : ids = ids;
let id; let _errorRan;
for ( var i = 0; i < 3; i++ ) {
  let dir = "./images/" + folders[i];
  let len = fs.readdirSync(dir).length;
  lengths[i] = len;
  // Is the ID valid?
  id = (Math.floor(Math.random() * len) + 1)
  if ( ids !== undefined && ids[i] !== "?" ) {
    if ( ids[i] <= len && ids[i] !== "0" ) {
      id = ids[i];
    } else if ( !_errorRan ) { __error(2, "Invalid ID\nProceeding with random ID", "covers.js"); _errorRan = true; };
  };
  images[i] = dir + "/" + id + ".png";
}
// random bg
// Has the user input a valid hex code?
console.log(options.hex);
if ( options.hex !== undefined && options.hex == /([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g ) { 
  options.hex = undefined; __error(1, "Invalid hex code\nProceeding with random hex code", "covers.js"); 
}
let col; (options.hex == undefined) ? col = `#${Math.floor(Math.random()*16777215).toString(16)}` : col = `#${options.hex}`;
console.log(chalk.gray("[1/1] ") + chalk.green("Generating background... ") + chalk.gray(`[${col}]`));
ctx.fillStyle = col;
ctx.fillRect(0, 0, SIZE, SIZE);

// Is the background too dark or too light? Code by Pointy, Modified by KMDDR
col = col.substring(1);  // strip #
var rgb = parseInt(col, 16);   // convert rrggbb to decimal
var luma = rgb * 0.0622710623; // convert 4096 (max) to 255 (max)
console.log(rgb, luma);
// Append stuffs
let paths = [ `./images/floor_${luma > 40}.png`, "./images/emblem.png", `./images/line_${luma < 40}.png`]; let albumName;
paths = paths.concat(images); ( options.albumname !== undefined && options.albumname !== "" ) ? albumName = fw(options.albumname) : albumName = _names[1];
let textInfo = [ [ _names[0], 72, 740, 165, 400 ], [ albumName, 56, 750, 300, 600 ], /* <- This one */ ];
// Append stuffs
_appendImages(paths, ctx, _canvas);
_appendText(textInfo, ctx, luma);
// Final save
fs.writeFileSync(`./images/exports/1.png`, _canvas.toBuffer('image/png'));