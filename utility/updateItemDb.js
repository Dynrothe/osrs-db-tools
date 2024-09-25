const fs = require("fs");
const path = require("path");
const dirPath = "./item_defs";

module.exports = () => {
  console.log("Adding new items to existing item-db.json...");

  const itemDb = fs.readFileSync("./item-db.json");
  let itemDbParsed = JSON.parse(itemDb);

  const jsonsInDir = fs.readdirSync(dirPath).filter((file) => path.extname(file) === ".json");

  let items = jsonsInDir.sort((a, b) => {
    a = a.split(".")[0];
    b = b.split(".")[0];

    return parseInt(a) - parseInt(b);
  });

  items = items.reverse();

  console.log(items.length);

  for (const item of items) {
    const itemData = fs.readFileSync(path.join(dirPath, item));
    const json = JSON.parse(itemData.toString());

    if (Object.values(itemDbParsed).some((element) => element.id === json.id)) break;

    if (json.name.toLowerCase() != "null" && json.name.toLowerCase() != "") {
      console.log("Found new item: " + json.name);

      itemDbParsed[json.id] = {
        id: json.id,
        name: json.name,
        isTradeable: json.isTradeable,
        icon: "",
        placeholderId: json.placeholderId,
      };
    }
  }

  fs.writeFileSync("./item-db.json", JSON.stringify(itemDbParsed));
  console.log("Complete!");
};
