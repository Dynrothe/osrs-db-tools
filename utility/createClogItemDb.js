const fs = require("fs");
const base64Encode = require("./base64Encode.js");
const getClogItemNames = require("./getClogItemNames.js");
const path = require("path");
const dirPath = "./item_defs";

const items = [];
let finalJson = {};
let index = 1;
let itemDb;

module.exports = async () => {
  try {
    itemDb = fs.readFileSync("./item-db.json");
  } catch (error) {
    console.clear();
    return console.error("ERROR: item-db.json not found, make sure you've generated that first!");
  }

  const itemDbParsed = JSON.parse(itemDb);
  const clogNames = await getClogItemNames();
  let filteredClogs = new Set();

  Object.values(itemDbParsed).filter((item) => {
    if (clogNames.includes(item.name) && !filteredClogs.has(item)) filteredClogs.add(item);
  });

  console.log("Clog name list:", clogNames.length);
  console.log("Final clog list:", uniqueArray.length);

  //fs.writeFileSync("./clog-db.json", JSON.stringify(filteredClogs));
};
