/// <reference types="cypress" />
import "cypress-file-upload";

// Ensure that the environment variables are set in cypress.config.js
const username = Cypress.env("username");
const password = Cypress.env("password");
const login_url = Cypress.env("login_url");
const import_url = Cypress.env("import_url");

describe("Cyara Portal Login and Test Case Import Automation", () => {
  Cypress.on("uncaught:exception", () => false);

  it("Logs into the Cyara portal and uploads test cases", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport(1478, 1056);

    // Login to Cyara portal
    cy.task("log", "Starting Cyara login process...");
    cy.visit(login_url, {
      failOnStatusCode: false,
      timeout: 90000,
    });

    cy.task("log", "Cyara login page loaded...");

    cy.get('input[type="text"]', { timeout: 20000 })
      .should("be.visible")
      .invoke("val", username)
      .trigger("input");

    cy.get('input[type="password"]')
      .should("be.visible")
      .invoke("val", password)
      .trigger("input");

    cy.contains("Login").should("be.visible").click();

    cy.url().then((currentUrl) => {
      cy.task("log", `Current URL after login: ${currentUrl}`);
    });

    cy.task("log", "Waiting for redirect to testcase import...");

    cy.visit(import_url, {
      failOnStatusCode: false,
      timeout: 90000,
    });
    cy.task("log", "Successfully logged into Cyara dashboard...");

    cy.get("body").then((body) => {
      if (
        body.text().includes("Session expired") ||
        body.text().includes("Login")
      ) {
        cy.task("log", "Session expired. Re-authenticating...");
        cy.reload();
        cy.get('input[type="text"]').invoke("val", username).trigger("input");
        cy.get('input[type="password"]')
          .invoke("val", password)
          .trigger("input");
        cy.contains("Login").click();
        cy.visit(import_url, { failOnStatusCode: false, timeout: 90000 });
        cy.task("log", "Re-authentication successful...");
      }
    });

    cy.task("listXmlFiles").then((fileNames) => {
      cy.task("log", `Found ${fileNames.length} XML files to upload.`);
      // cy.task("log", fileNames);

      for (const fileName of fileNames) {
        cy.task("log", `Uploading file: ${fileName}`);

        cy.visit(import_url, {
          failOnStatusCode: false,
          timeout: 90000,
        });

        cy.get('input[type="file"]', { timeout: 10000 })
          .should("exist")
          .selectFile(`cypress/fixtures/temp_testcases/${fileName}`, {
            force: true,
          });

        cy.contains("All Test Cases processed", { timeout: 30000 }).should(
          "be.visible"
        );

        cy.task("log", `${fileName} uploaded successfully.`);
      }
    });
  });
});
