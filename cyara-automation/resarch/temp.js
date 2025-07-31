describe("Cyara Portal Login Automation", () => {
  it("Logs into the Cyara portal", () => {
    cy.visit("https://www.cyaraportal.us/cyarawebidentity/login");

    // Wait for the input fields to appear
    cy.get('input[type="text"]', { timeout: 10000 })
      .should("be.visible")
      .type(Cypress.env("username"));
    cy.get('input[type="password"]')
      .should("be.visible")
      .type(Cypress.env("password"));

    // Click Login button
    cy.contains("Login").click();

    // Confirm successful login
    cy.url().should("include", "/cyarawebportal");
  });
});

describe("Cyara Portal Login Automation", () => {
  it("Logs into the Cyara portal and lands on dashboard", () => {
    cy.visit("https://www.cyaraportal.us/cyarawebidentity/login");

    // Wait for the username field to appear
    cy.get('input[type="text"]', { timeout: 10000 })
      .should("be.visible")
      .type(Cypress.env("username"));

    // Wait for the password field to appear
    cy.get('input[type="password"]')
      .should("be.visible")
      .type(Cypress.env("password"));

    // Click the Login button
    cy.contains("Login").should("be.visible").click();

    // Wait for redirect to dashboard
    cy.url({ timeout: 20000 }).should(
      "include",
      "/cyara-app/843/dashboard/report/home"
    );
  });
});

let username = Cypress.env("username");
let password = Cypress.env("password");

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Cyara Portal Login Automation", () => {
  it("Logs into the Cyara portal and lands on dashboard", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport(1478, 1056);

    cy.visit("https://www.cyaraportal.us/cyarawebidentity/login", {
      failOnStatusCode: false,
      timeout: 90000,
    });

    cy.task("log", "Cyara login page loaded...");

    cy.get('input[type="text"]', { timeout: 10000 })
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
    cy.task("log", "Waiting for redirect to dashboard...");
    // cy.visit("https://www.cyaraportal.us", {
    //   onBeforeLoad(win) {
    //     win.localStorage.setItem(
    //       "id_token",
    //       "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJDMThFMEQzMDdCQ0MxMTNFNDRBMEUzMzFDOTQ5OURFIiwieDV0IjoiWDg1VkctUzVNVnpPU0ZObG5PZS1NMnV2b0JnIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL3d3dy5jeWFyYXBvcnRhbC51cy9jeWFyYXdlYmlkZW50aXR5IiwibmJmIjoxNzUzOTU3ODA5LCJpYXQiOjE3NTM5NTc4MDksImV4cCI6MTc1Mzk1ODEwOSwiYXVkIjoiY3lhcmEud2ViLnBvcnRhbCIsImFtciI6WyJwd2QiXSwibm9uY2UiOiI2Mzg4OTU1NDYwMTk4OTA0NTMuWldFek1qazFNamd0WVRJNVpTMDBOVEJqTFRneFpEUXRPV0V3WmpabE1ERXlaVFUwTnpZME9UY3lOVGd0TURjNU1pMDBNV015TFdKbE5UWXRZall4WlRGa09HUXlZbUUwIiwiYXRfaGFzaCI6IlVNNFBXMUQyUTM0cXpyYW5FakJxR3ciLCJzaWQiOiIyMzEwM0JFMjI3OTE0N0UzNUVGRTdFNzJFODQyRUEyNSIsInN1YiI6ImJkY2E5MWNmLTQwZTItNDdmYy05OTk5LTNlM2VkZmRhNmU3ZSIsImF1dGhfdGltZSI6MTc1Mzk1NzgwOCwiaWRwIjoibG9jYWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJoYXJpcHJhc2F0aC5rdW1hciIsInJvbGUiOiJRQUxlYWQiLCJzZWN1cml0eV9zdGFtcCI6IjJhNGIwZThlLTRjMWQtNGQxMS04YjY2LTQwM2NhZmQzMzY3MCIsImFjY291bnRzIjoiODQzIiwiYWNjb3VudC1ndWlkcyI6IjA2NTY5ZjdkLWNiMWEtNDIxYi04YWI3LTA0Nzk5NDJjZmFmOSIsInVzZXJuYW1lIjoiaGFyaXByYXNhdGgua3VtYXIifQ.XedaO5ZosO1-0RwS4XuzJuxyPlPmH0-erAsqFCh5P6Q6PPYNlkq3ZgFq6ZAWV8F-O2UHWqr8G-koVRhv3W72aBJ3-X6oC0ODiI4wOTc8NL7lQkvIW8WclW7KmaVFUZQQrNCkkdRIZFxtipUh-W5g31IJRwzIj29iIspCYleyyqYI1c6KW_6XR0IBvbZThirpQvTwVgeF_0scmN4uVcRorHxPLA7uDBPKEXtw1b-LZu8Ru7r7aQg142o7XPYC-5l4Yb7QMf5LxBuwWMY7vjRpW_sCWB6PCpvUF9NWG6bbIb08BwyvjnIFDahyXDVYk-HSSps-TrfzaKjhn1ZWqYLo4Q"
    //     );
    //     win.localStorage.setItem(
    //       "access_token",
    //       "43EB4FF6E4F0146FCEE0F3ECC54B65E0151AAE26F20DA01417718949860BC195-1"
    //     );
    //     win.localStorage.setItem("token_type", "Bearer");
    //     win.localStorage.setItem("expires_in", "86400");
    //     win.localStorage.setItem(
    //       "scope",
    //       "accounts openid profile roles identity web_api zendesk_sso inthub introspect username"
    //     );
    //     win.localStorage.setItem(
    //       "state",
    //       "OpenIdConnect.AuthenticationProperties=M2RtXnV99gvSuL-39FptdNi3H9NIX6zTQppQyVjezTtT72Y-057aJNCMyn4TX6m_Hj_AirBm3Kwi2b5n23woYmsNdK-zsF5dR9jX8qvkkFG9p7mdaDm48e5FRCXdaou_SXdkZWD-_ZDUyhzJxktbbw"
    //     );
    //     win.localStorage.setItem(
    //       "session_state",
    //       "FhUsre2mfUHfAt1iSTM4_GQpFfdQw6UrH7DdL-AI1gU.14BF3C8F5BA378710635A6D306194F82"
    //     );
    //   },
    // });

    cy.visit("https://www.cyaraportal.us/cyarawebportal/843/testcase/import");

    cy.task("log", "Successfully logged into Cyara dashboard...");

    // Session expiration handling
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
        cy.visit(
          "https://www.cyaraportal.us/cyarawebportal/843/testcase/import"
        );
        cy.task("log", "Re-authentication successful...");
      }
    });
  });
});

// Final

describe("Cyara Portal Login and Test Case Import Automation", () => {
  let username = Cypress.env("username");
  let password = Cypress.env("password");

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  it("Logs into the Cyara portal and lands on dashboard", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport(1478, 1056);

    cy.visit("https://www.cyaraportal.us/cyarawebidentity/login", {
      failOnStatusCode: false,
      timeout: 90000,
    });

    cy.task("log", "Cyara login page loaded...");

    cy.get('input[type="text"]', { timeout: 10000 })
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
    cy.task("log", "Waiting for redirect to dashboard...");

    cy.visit("https://www.cyaraportal.us/cyarawebportal/843/testcase/import");
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
        cy.visit(
          "https://www.cyaraportal.us/cyarawebportal/843/testcase/import"
        );
        cy.task("log", "Re-authentication successful...");
      }
    });

    const testFiles = ["New loan_TestCase_2.xml"];

    testFiles.forEach((fileName) => {
      it(`Uploads ${fileName}`, () => {
        cy.get('input[type="file"]').attachFile(
          `cypress/fixtures/temp_testcases/${fileName}`,
          { force: true }
        );
        cy.contains("All Test Cases processed", { timeout: 30000 }).should(
          "be.visible"
        );
        // cy.contains("Successfully imported Test Case").should("be.visible");
      });
    });
  });
});

describe("Cyara Portal Login and Test Case Import Automation", () => {
  let username = Cypress.env("username");
  let password = Cypress.env("password");

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  it("Logs into the Cyara portal and lands on dashboard", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport(1478, 1056);

    cy.visit("https://www.cyaraportal.us/cyarawebidentity/login", {
      failOnStatusCode: false,
      timeout: 90000,
    });

    cy.task("log", "Cyara login page loaded...");

    cy.get('input[type="text"]', { timeout: 10000 })
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

    cy.task("log", "Waiting for redirect to dashboard...");

    cy.visit("https://www.cyaraportal.us/cyarawebportal/843/testcase/import");
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
        cy.visit(
          "https://www.cyaraportal.us/cyarawebportal/843/testcase/import"
        );
        cy.task("log", "Re-authentication successful...");
      }
    });

    const testFiles = ["New loan_TestCase_2.xml"];

    testFiles.forEach((fileName) => {
      cy.task("log", `Uploading file: ${fileName}`);

      // Click the "Select File" button to activate the file input
      cy.contains("Select File...", { timeout: 10000 })
        .should("be.visible")
        .click();

      // Wait for the file input to appear and attach the file
      cy.get('input[type="file"]', { timeout: 10000 })
        .should("exist")
        .attachFile(`cypress/fixtures/temp_testcases/${fileName}`, {
          force: true,
        });

      // Confirm the file was processed
      cy.contains("All Test Cases processed", { timeout: 30000 }).should(
        "be.visible"
      );

      cy.task("log", `${fileName} uploaded successfully.`);
    });
  });
});

/// <reference types="cypress" />
import "cypress-file-upload";

describe("Cyara Portal Login and Test Case Import Automation", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  Cypress.on("uncaught:exception", () => false);

  it("Logs into the Cyara portal and uploads test cases", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport(1478, 1056);

    cy.visit("https://www.cyaraportal.us/cyarawebidentity/login", {
      failOnStatusCode: false,
      timeout: 90000,
    });

    cy.task("log", "Cyara login page loaded...");

    cy.get('input[type="text"]', { timeout: 10000 })
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

    cy.task("log", "Waiting for redirect to dashboard...");

    cy.visit("https://www.cyaraportal.us/cyarawebportal/843/testcase/import");
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
        cy.visit(
          "https://www.cyaraportal.us/cyarawebportal/843/testcase/import"
        );
        cy.task("log", "Re-authentication successful...");
      }
    });

    const testFiles = [
      "New loan_TestCase_1.xml",
      "New loan_TestCase_2.xml",
      "New loan_TestCase_3.xml",
      "New loan_TestCase_4.xml",
    ];

    testFiles.forEach((fileName) => {
      cy.task("log", `Uploading file: ${fileName}`);

      // Upload the file using the input directly
      cy.get('input[type="file"]', { timeout: 10000 })
        .should("exist")
        .selectFile(`cypress/fixtures/temp_testcases/${fileName}`, {
          force: true,
        });

      // Confirm the file was processed
      cy.contains("All Test Cases processed", { timeout: 30000 }).should(
        "be.visible"
      );

      cy.task("log", `${fileName} uploaded successfully.`);
    });
  });
});

/// <reference types="cypress" />
import "cypress-file-upload";

describe("Cyara Portal Login and Test Case Import Automation", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  Cypress.on("uncaught:exception", () => false);

  it("Logs into the Cyara portal and uploads test cases", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport(1478, 1056);

    cy.visit("https://www.cyaraportal.us/cyarawebidentity/login", {
      failOnStatusCode: false,
      timeout: 90000,
    });

    cy.task("log", "Cyara login page loaded...");

    cy.get('input[type="text"]', { timeout: 10000 })
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

    cy.task("log", "Waiting for redirect to dashboard...");

    cy.visit("https://www.cyaraportal.us/cyarawebportal/843/testcase/import");
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
        cy.visit(
          "https://www.cyaraportal.us/cyarawebportal/843/testcase/import"
        );
        cy.task("log", "Re-authentication successful...");
      }
    });

    const testFiles = [
      "New loan_TestCase_1.xml",
      "New loan_TestCase_2.xml",
      "New loan_TestCase_3.xml",
      "New loan_TestCase_4.xml",
    ];

    // Use Cypress.Promise to handle async loop
    cy.wrap(null).then(() => {
      return Cypress.Promise.each(testFiles, (fileName) => {
        cy.task("log", `Uploading file: ${fileName}`);

        cy.get('input[type="file"]', { timeout: 30000 })
          .should("exist")
          .selectFile(`cypress/fixtures/temp_testcases/${fileName}`, {
            force: true,
          });

        cy.contains("All Test Cases processed", { timeout: 30000 }).should(
          "be.visible"
        );

        cy.task("log", `${fileName} uploaded successfully.`);
      });
    });
  });
});

// manually add the file names
const testFiles = getXmlFileNames();
cy.task("log", `Found ${testFiles.length} XML files to upload.`);
cy.task("log", testFiles);

for (const fileName of testFiles) {
  cy.task("log", `Uploading file: ${fileName}`);

  // Revisit the import page to reset the file input
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
