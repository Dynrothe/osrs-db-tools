const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://oldschool.runescape.wiki/w/Collection_log";
const clogItems = [];

module.exports = async () => {
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    // Find all table tags
    $("table").each((index, table) => {
      const hasItemsTd =
        $(table)
          .find("th")
          .filter((i, td) => $(td).text().trim() === "Items").length > 0;

      if (hasItemsTd) {
        $(table)
          .find("a[title]")
          .each((i, aTag) => {
            const title = $(aTag).attr("title");

            if (!clogItems.includes(title)) {
              clogItems.push(title);
            }
          });
      }
    });
  } catch (error) {
    console.error(`Error fetching clog item names: ${error.message}`);
  }

  return clogItems;
};
