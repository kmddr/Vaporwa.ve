
const chalk = require("chalk");
let pjson = require('../package.json');
const { loadImage } = require("canvas");
const fs = require("fs");

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
function rr(min, max) { return clamp(Math.floor(Math.random() * max), min, max); }

function __error(id, txt, src) {
  console.log(chalk.gray("==========================================="));
  console.log("vaporwa.ve@" + pjson.version + `: ${src}`);
  console.log(chalk.red(`Error ${id}: ${txt}`));
  console.log(chalk.gray("==========================================="));
}

function _appendText(t, ctx, luma) {
  for ( let i = 0; i < t.length; i++ ) {
    console.log(chalk.gray(`[${i + 1}/${t.length}] `) + chalk.green("Generating text... ") + chalk.gray(t[i][0]));
    if (luma < 40)  ctx.fillStyle = "#fff"; // dark
    if (luma > 215) ctx.fillStyle = "#000"; // light
    ctx.font = `${t[i][1]}pt Sans`; ctx.fillText(t[i][0], t[i][2], t[i][3] + t[i][1], t[i][4]);
  }
}

function _appendImages(paths, ctx, _canvas) {
  for ( let i = 0; i < paths.length; i++ ) {
    console.log(chalk.gray(`[${i + 1}/${paths.length}] `) + chalk.green(`Generating image ${i + 1}... `) + chalk.gray(paths[i]));
    loadImage(paths[i]).then(image => {
      if( !paths[i].includes("etc") ) {
        ctx.drawImage(image, 0, 0, 1400, 1400);
        fs.writeFileSync(`./images/exports/1.png`, _canvas.toBuffer('image/png'));
      } else {
        ctx.drawImage(image, rr(200, 1200), rr(200, 1200), rr(70, 1400), rr(70, 1400));
        fs.writeFileSync(`./images/exports/1.png`, _canvas.toBuffer('image/png'));
      }
    });
  }
};

function convertToFullwidth(text) {
  // Written by tiskolin
	var output = "";
	for (i = 0; i < text.length; i++) {
		if (text[i] >= '!' && text[i] <= '~') { // Check whether character is latin
			output += String.fromCharCode(text.charCodeAt(i) - 0x20 + 0xff00); // Convert to fullwidth
		} else if (text[i] == " ") { // Check if character is space
			output += "　"; // Convert to fullwidth space
		} else {
			output += text[i]; // Leave it be
		}
	}
	return output;
}

module.exports = {
  _appendImages: _appendImages,
  __error: __error,
  _appendText: _appendText,
  rr: rr,
  clamp: clamp,
  convertToFullwidth: convertToFullwidth,
}