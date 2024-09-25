const fs = require("fs");
const base64Encode = require("./base64Encode.js");
let index = 1;

module.exports = () => {
  console.log("Recreating icons for all items...");

  const itemDb = fs.readFileSync("./item-db.json");
  const itemDbParsed = JSON.parse(itemDb);
  const itemDbLength = Object.entries(itemDbParsed).length;

  Object.entries(itemDbParsed).forEach((item) => {
    process.stdout.write(`Progress: ${index}/${itemDbLength}\r`);

    const base64 = base64Encode(`./icon/${item[1].id}.png`);
    item[1].icon = `data:image/png;base64,${base64}`;

    index++;
  });

  fs.writeFileSync("./item-db.json", JSON.stringify(itemDbParsed));
};
