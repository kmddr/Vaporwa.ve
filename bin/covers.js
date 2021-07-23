#!/usr/bin/env node
// 2021 Vaporwa.ve

const SIZE = 1400;

const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const chalk = require("chalk");
const _names = require("./names.js");

// canvas bullcrap go here lol
let _canvas = createCanvas(SIZE, SIZE);
let ctx = _canvas.getContext("2d");

// Get how many files are in each dir
let folders = [ "etc", "paintings", "statues" ];
let lengths = [];
let images = [];
for ( var i = 0; i < 3; i++ ) {
  let dir = "./images/" + folders[i];
  let len = fs.readdirSync(dir).length;
  lengths[i] = len;
  images[i] = dir + "/" + (Math.floor(Math.random() * len) + 1) + ".png";
}
console.log(folders, lengths, images);

// random bg
let col = `#${Math.floor(Math.random()*16777215).toString(16)}`;
console.log(chalk.gray("[1/7] ") + chalk.green("Generating background... ") + chalk.gray(`[${col}]`));
ctx.fillStyle = col;
ctx.fillRect(0, 0, SIZE, SIZE);
// Add floor
console.log(chalk.gray("[2/7] ") + chalk.green("Generating floor... ") + chalk.gray("./images/floor.png"));
loadImage('./images/floor.png').then(image => { ctx.drawImage(image, 0, 0, 1400, 1400); });
// Add painting
console.log(chalk.gray("[3/7] ") + chalk.green("Generating painting... ") + chalk.gray(images[1]));
loadImage(images[1]).then(image => { ctx.drawImage(image, 0, 0, 1400, 1400); });
// Add emblem
console.log(chalk.gray("[4/7] ") + chalk.green("Generating emblem... ") + chalk.gray("./images/emblem.png"));
loadImage("./images/emblem.png").then(image => { ctx.drawImage(image, 0, 0, 1400, 1400); });
// Add text
console.log(chalk.gray("[5/7] ") + chalk.green("Generating text... ") + chalk.gray(_names[0]));
ctx.font = "72pt Arial Condensed";
ctx.textAlign = "left"
ctx.fillStyle = "#fff";
ctx.fillText(_names[0], 740, 165 + 72, 400);
loadImage("./images/line.png").then(image => { ctx.drawImage(image, 0, 0, 1400, 1400); });
// Add text
console.log(chalk.gray("[6/7] ") + chalk.green("Generating text... ") + chalk.gray(_names[1]));
ctx.font = "56pt Arial Condensed";
ctx.textAlign = "left"
ctx.fillStyle = "#fff";
ctx.fillText(_names[1], 750, 300 + 56, 600);
// Add statue
console.log(chalk.gray("[7/7] ") + chalk.green("Generating statue... ") + chalk.gray(images[2]));
loadImage(images[2]).then(image => {
  ctx.drawImage(image, 0, 0, 1400, 1400);
  // Save
  const buffer = _canvas.toBuffer('image/png')
  fs.writeFileSync(`./images/exports/1.png`, buffer);
});