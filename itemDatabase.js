const argv = require("minimist")(process.argv.slice(2));
const createNewItemDbJson = require("./utility/createNewItemDb.js");
const updateIconsFromIconFiles = require("./utility/updateIconsFromIconFiles.js");
const updateIconsFromRunelite = require("./utility/updateIconsFromRunelite.js");
const updateItemDb = require("./utility/updateItemDb.js");

const createClogItemDb = require("./utility/createClogItemDb.js");

console.clear();
console.log("starting...");

switch (true) {
  // Create item-db.json from scratch
  case argv.create:
    createNewItemDbJson();
    break;

  // Update item-db.json with new items
  case argv.update:
    updateItemDb();
    break;

  // Create base64 icons to all items
  case argv.iconsFromFile:
    updateIconsFromIconFiles();
    break;

  // Update items with icons from static.runelite.net
  case argv.iconsFromRunelite:
    updateIconsFromRunelite();
    break;

  // Create item-db.json but for clogs
  case argv.clog:
    createClogItemDb();
    break;
}
