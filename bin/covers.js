//CONFIG (if the aspect ratio isnt 1:1 then you smell bruh)

const ART_WIDTH = 1400;
const ART_HEIGHT = 1400;

// get stuff (wow thanks ethan this comment is very useful)
const fs = require("fs");
const canvas = require("canvas");

// assets will be where the actual assets get stored (e.g. assets.statues.Helios.png), paths will be the config for the different objects
let assets = {
  floor: "../images/floor.png", // Checkerboard floor
};
let paths = {
  paintings:  "../images/paintings/", // the painting under the text
  statues:    "../images/statues/", // the helios statue
  etc:        "../images/etc/", // the random bullshit that gives the cover art some more PAZAZ
};

// canvas bullcrap go here lol
let coverArtCanvas = canvas.createCanvas(ART_WIDTH,ART_HEIGHT);
let coverArtContext = coverArtCanvas.getContext("2d");

console.log(fs.readdir("../images/"));

Object.keys(paths).forEach(currentAssetType => {
  let currentPath = paths[currentAssetType];

  // we must now scan each directory for usable shit and store that
  fs.readdirSync(testFolder).forEach(file => {
    console.log(file);
  });
});
