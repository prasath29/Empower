const { defineConfig } = require("cypress");
const {
  getXmlFileNames,
} = require("../cyara-automation/cypress/utils/helper.js");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Register all tasks in one place
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
        listXmlFiles() {
          return getXmlFileNames();
        },
      });

      return config;
    },
  },
});
