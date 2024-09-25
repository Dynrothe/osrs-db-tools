const fs = require("fs");
const fetch = require("node-fetch");

module.exports = async () => {
  console.log("Fetching new icons...");

  (async () => {
    const itemDb = fs.readFileSync("./item-db.json");
    let itemDbParsed = JSON.parse(itemDb);

    let count = Object.entries(itemDbParsed).length;

    for (let i = count; i > 0; i--) {
      if (Object.entries(itemDbParsed)[i - 1][1].icon == "") {
        try {
          let base64 = await fetch(
            `https://static.runelite.net/cache/item/icon/${Object.entries(itemDbParsed)[i - 1][1].id}.png`
          )
            .then((r) => r.buffer())
            .then((buf) => `data:image/png;base64,` + buf.toString("base64"));

          Object.entries(itemDbParsed)[i - 1][1].icon = base64;
          console.log(
            `Fetched icon for: ${Object.entries(itemDbParsed)[i - 1][1].id} - ${
              Object.entries(itemDbParsed)[i - 1][1].name
            }`
          );
        } catch (error) {
          console.log(`Could not find icon for ${Object.entries(itemDbParsed)[i - 1][1].id}`);
          console.log(error);
          return;
        }
      } else {
        fs.writeFileSync("./item-db.json", JSON.stringify(itemDbParsed));
        return;
      }

      // Incase you want to slowdown the fetching
      //await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  })();
};
