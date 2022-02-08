import { CLIENT_URL } from "../../src/env";

describe("ErrorPage feature", () => {
  it("if the user access the page via url without buying anything, 'not found page' should to be show", () => {
    cy.visit(`${CLIENT_URL}/create-order`);

    cy.get("[data-cy=not-found-container]").contains("Something bad");
  });
});
