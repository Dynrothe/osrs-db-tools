const fs = require("fs");
const getClogItemIds = require("./getClogItemIds.js");
const fetchLatestPrices = require("./fetchGEPrices.js");

let itemDb;
let finalJson = {};

module.exports = async () => {
  try {
    itemDb = fs.readFileSync("./item-db.json");
  } catch (error) {
    console.clear();
    return console.error("ERROR: item-db.json not found, make sure you've generated that first!");
  }

  const itemDbParsed = JSON.parse(itemDb);
  const clogItems = await getClogItemIds();

  const scrapedIDSet = new Set(clogItems.map((id) => id.trim()));

  const matchingItems = Object.values(itemDbParsed).filter((item) => scrapedIDSet.has(item.id.toString()));

  const prices = await fetchLatestPrices();

  matchingItems.forEach((item) => {
    const itemPrice = prices.data[item.id];

    let price = 0;

    if (itemPrice) {
      price = (itemPrice.high + itemPrice.low) / 2;
    }

    finalJson[item.id] = {
      id: item.id,
      name: item.name,
      isTradeable: item.isTradeable,
      icon: item.icon,
      price: price,
    };
  });

  fs.writeFileSync("./clog-db.json", JSON.stringify(finalJson));
};
