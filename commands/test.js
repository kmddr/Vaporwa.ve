
let bfore = Date.now();
let pjson = require('../package.json');
console.log("vaporwa.ve@" + pjson.version + ": vapor-test");
console.log("Test sucessful, " + (Date.now() - bfore) + " ms");

// == vaporwa.ve@0.03 ==
// ===== vapor-test =====