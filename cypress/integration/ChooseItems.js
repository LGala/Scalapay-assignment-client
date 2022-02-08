import { CLIENT_URL } from "../../src/env";

const putInCartSomeItems = () => {
  cy.visit(`${CLIENT_URL}`);

  cy.get("[data-cy=buy-items]").should("not.exist");

  cy.get("[data-cy=cart-add]").click({ multiple: true });

  cy.get("[data-cy=items-container]")
    .children()
    .its("length")
    .then(length => {
      cy.get("[data-cy=buy-items]").contains(`BUY ${length} ITEMS`);
    });
};

describe("Cart features", () => {
  it("Clicking + button should increase by one the cart counter", () => {
    putInCartSomeItems();
  });

  it("Clicking - button should decrease by one the cart counter", () => {
    putInCartSomeItems();

    cy.get("[data-cy=cart-remove]").click({ multiple: true });

    cy.get("[data-cy=buy-items]").should("not.exist");
  });
});
