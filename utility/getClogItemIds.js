const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://oldschool.runescape.wiki/w/Collection_log/Table";

module.exports = async () => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const itemIDs = [];

    $("table.wikitable tbody tr").each((_, element) => {
      const itemID = $(element).attr("data-item-id");
      if (itemID) {
        itemIDs.push(itemID);
      }
    });

    return itemIDs;
  } catch (error) {
    console.error(`Error fetching the URL: ${error.message}`);
    return [];
  }
};
