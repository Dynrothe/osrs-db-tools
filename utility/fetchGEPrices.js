const axios = require("axios");

module.exports = async () => {
  try {
    const response = await axios.get("https://prices.runescape.wiki/api/v1/osrs/latest", {
      headers: {
        "User-Agent": "LogHunters Discord (Discord: Dynny)",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching prices:", error);
  }
};
