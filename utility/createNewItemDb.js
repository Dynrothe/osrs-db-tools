const fs = require("fs");
const base64Encode = require("./base64Encode.js");
const path = require("path");
const dirPath = "./item_defs";

module.exports = () => {
  const items = [];
  let finalJson = {};
  let index = 1;

  console.log("Parsing files...");
  const jsonsInDir = fs.readdirSync(dirPath).filter((file) => path.extname(file) === ".json");

  jsonsInDir.forEach(async (file) => {
    process.stdout.write(`Progress: ${index}/${jsonsInDir.length}\r`);

    const fileData = fs.readFileSync(path.join(dirPath, file));
    const json = JSON.parse(fileData.toString());

    items.push(json);

    const ID = json.id;
    const name = json.name;
    const isTradeable = json.isTradeable;
    const placeholderId = json.placeholderId;
    const notedId = json.notedID;

    const base64 = base64Encode(`./icon/${ID}.png`);
    let icon;

    if (base64 == null) {
      icon = "";
    } else {
      icon = `data:image/png;base64,${base64}`;
    }

    if (name.toLowerCase() != "null" && name != "") {
      finalJson[ID] = {
        id: ID,
        name: name,
        isTradeable: isTradeable,
        placeholderId: placeholderId,
        notedId: notedId,
        icon: icon,
      };
    }
    index++;
  });

  fs.writeFileSync("./item-db.json", JSON.stringify(finalJson));

  console.clear();
  console.log("Completed!");
};
