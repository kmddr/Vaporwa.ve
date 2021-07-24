
const randomWords = require("random-words");
const { convertToFullwidth } = require("../bin/functions");

// Generate artist name
let ARTIST_NAME = "MAC";
for ( let x = 0; x < 4; x++ ) { ARTIST_NAME += String.fromCharCode(0x30A0 + Math.random() * (0x30FF-0x30A0+1)); } ARTIST_NAME = convertToFullwidth(ARTIST_NAME);
// Generate album name
let ALBUM_NAME = convertToFullwidth(randomWords().toUpperCase() + " SHOPPE");
// Generate track names
let tracks = Array(10);
for ( let k = 0; k < tracks.length; k++ ) {
  // Grab random Katakana
  // This will eventually be replaced by real words; but
  // Free and reliable translation APIs are hard to find
  tracks[k] = "";
  for ( let i = 0; i <= 10; i++ ) {
    // Loop 10 times
    tracks[k] += String.fromCharCode(0x30A0 + Math.random() * (0x30FF-0x30A0+1));
  }
  // Add random snippet from JSON
  let json = require('./data.json');
  let snippets = json.snippets;
  // Add spaces
  let entry = snippets[Math.floor(Math.random() * snippets.length)];
  entry = entry.split().join(" ");
  // Append snippet to random character
  let y = tracks[k];
  let x = Math.floor(Math.random() * y.length);
  y = y.substring(0, x) + convertToFullwidth(entry) + y.substring(x, y.length);
  tracks[k] = y;
  console.log(tracks[k])
};
let NAMES = [ ARTIST_NAME, ALBUM_NAME, tracks ];
module.exports = NAMES;
// 2021 VaporwAIve