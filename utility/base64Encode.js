const fs = require("fs");

module.exports = (file) => {
  let bitmap;

  try {
    bitmap = fs.readFileSync(file);
    return new Buffer.from(bitmap).toString("base64");
  } catch (error) {
    return null;
  }
};
