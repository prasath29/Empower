const fs = require("fs");
const path = require("path");

const getXmlFileNames = (
  folderPath = "cypress\\fixtures\\temp_testcases\\"
) => {
  try {
    const files = fs.readdirSync(folderPath);
    const xmlFiles = files
      .filter((file) => path.extname(file).toLowerCase() === ".xml")
      .map((file) => path.basename(file));
    return xmlFiles;
  } catch (err) {
    console.error(`Error reading folder "${folderPath}":`, err);
    return [];
  }
};

module.exports = {
  getXmlFileNames,
};
