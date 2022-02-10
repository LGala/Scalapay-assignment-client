import { CLIENT_URL } from "../../src/env";

const completeConsumerFormFlow = () => {
  cy.visit(`${CLIENT_URL}/`);

  cy.get("[data-cy=cart-add]").click({ multiple: true });

  cy.get("[data-cy=buy-items]").click();

  cy.get("[data-cy=go-billing-form]").should("not.exist");
  cy.get("[data-cy=consumer-container]").contains("Required");

  cy.get("[data-cy=given-names]").type("Lorenzo");

  cy.get("[data-cy=go-billing-form]").should("not.exist");
  cy.get("[data-cy=consumer-container]").contains("Required");

  cy.get("[data-cy=surname]").type("Galafassi");

  cy.get("[data-cy=go-billing-form]").should("exist");
  cy.get("[data-cy=consumer-container]").should("not.contain", "Required");

  cy.get("[data-cy=email]").type("a@a.com");

  cy.get("[data-cy=go-billing-form]").should("exist");
  cy.get("[data-cy=consumer-container]").should("not.contain", "Required");
};

const goToShippingPage = () => {
  completeConsumerFormFlow();

  cy.get("[data-cy=go-billing-form]").click();

  cy.get("[data-cy=country-code]").type("xx");

  cy.get("[data-cy=go-shipping-or-discount-form]").click();

  cy.get("[data-cy=place-form-container]").contains("we need just some shipping info");
};

const completeShippingFormFlow = () => {
  goToShippingPage();

  cy.get("[data-cy=name]").type("Lorenzo");

  cy.get("[data-cy=go-shipping-or-discount-form]").should("not.exist");
  cy.get("[data-cy=place-form-container]").contains("Required");

  cy.get("[data-cy=country-code]").type("ITA");

  cy.get("[data-cy=go-shipping-or-discount-form]").should("not.exist");
  cy.get("[data-cy=place-form-container]").contains("Required");

  cy.get("[data-cy=post-code]").type("xxx");

  cy.get("[data-cy=go-shipping-or-discount-form]").should("not.exist");
  cy.get("[data-cy=place-form-container]").contains("Required");

  cy.get("[data-cy=suburb]").type("yyy");

  cy.get("[data-cy=go-shipping-or-discount-form]").should("not.exist");
  cy.get("[data-cy=place-form-container]").contains("Required");

  cy.get("[data-cy=line1]").type("zzz");

  cy.get("[data-cy=go-shipping-or-discount-form]").should("not.exist");
  cy.get("[data-cy=place-form-container]").contains("Required");

  cy.get("[data-cy=country-code]").focus().clear().type("IT");

  cy.get("[data-cy=go-shipping-or-discount-form]").should("exist");
  cy.get("[data-cy=place-form-container]").should("not.contain", "Required");
};

const createOneDiscountEntry = () => {
  completeShippingFormFlow();

  cy.get("[data-cy=go-shipping-or-discount-form]").click();

  cy.get("[data-cy=discount-item]").should("not.exist");

  cy.get("[data-cy=create-new-entry]").click();

  cy.get("[data-cy=discount-item]").should("exist");
};

describe("Consumer info form features", () => {
  it("when the form is correctly validated, the next button should appear instead of the 'Required message'", () => {
    completeConsumerFormFlow();
  });
});

describe("Billing form features", () => {
  it("when checkbox is checked and next button pressed, app should show discounts form", () => {
    completeConsumerFormFlow();

    cy.get("[data-cy=go-billing-form]").click();

    cy.get("[data-cy=name]").type("Lorenzo");

    cy.get("[data-cy=go-shipping-or-discount-form]").should("exist");

    cy.get("[data-cy=country-code]").type("x");

    cy.get("[data-cy=discount-item]").should("not.exist");

    cy.get("[data-cy=country-code]").type("x");

    cy.get("[data-cy=go-shipping-or-discount-form]").should("exist");

    cy.get("[data-cy=post-code]").type("xxx");
    cy.get("[data-cy=suburb]").type("yyy");
    cy.get("[data-cy=line1]").type("zzz");

    cy.get("[data-cy=billing-shipping-equal-checkbox]").click();

    cy.get("[data-cy=go-shipping-or-discount-form]").click();

    cy.get("[data-cy=discounts-items-container]").contains("discount");
  });

  it("when checkbox is not checked and the button gets pressed, app should show the shipping form", () => {
    goToShippingPage();
  });

  it("when the country code is 0 or 2 letter long, the next button should appear instead of the 'required message'", () => {
    completeConsumerFormFlow();

    cy.get("[data-cy=go-billing-form]").click();

    cy.get("[data-cy=go-shipping-or-discount-form]").should("exist");

    cy.get("[data-cy=place-form-container]").should("not.contain", "CountryCode");

    cy.get("[data-cy=country-code]").type("x");

    cy.get("[data-cy=go-shipping-or-discount-form]").should("not.exist");

    cy.get("[data-cy=place-form-container]").contains("CountryCode");

    cy.get("[data-cy=country-code]").type("x");

    cy.get("[data-cy=go-shipping-or-discount-form]").should("exist");

    cy.get("[data-cy=place-form-container]").should("not.contain", "CountryCode");
  });
});

describe("Shipping form features", () => {
  it("when the form is correctly validated, the next button should appear", () => {
    completeShippingFormFlow();
  });
});

describe("Discount form features", () => {
  it("when 'create a new discount entry' is pressed, a new entry should be visualized", () => {
    createOneDiscountEntry();
  });

  it("when the currency is filled and the discount amount > 0 or there is no discount entry, 'create a new discount entry' should be visible", () => {
    createOneDiscountEntry();

    cy.get("[data-cy=submit-entire-flow]").should("not.exist");
    cy.get("[data-cy=discounts-items-container]").contains("Require");

    cy.get("[data-cy=discount-amount]").type("-1");

    cy.get("[data-cy=submit-entire-flow]").should("not.exist");
    cy.get("[data-cy=discounts-items-container]").contains("Require");

    cy.get("[data-cy=discount-currency]").type("EUR");

    cy.get("[data-cy=submit-entire-flow]").should("not.exist");
    cy.get("[data-cy=discounts-items-container]").contains("Require");

    cy.get("[data-cy=discount-amount]").focus().clear().type("0");

    cy.get("[data-cy=submit-entire-flow]").should("not.exist");
    cy.get("[data-cy=discounts-items-container]").contains("Require");

    cy.get("[data-cy=discount-amount]").focus().clear().type("100");

    cy.get("[data-cy=submit-entire-flow").should("exist");
    cy.get("[data-cy=discounts-items-container]").should("not.contain", "Require");
  });

  it("when the discount amount > the items total cost, 'create a new discount entry' shouldn't be visible and a message should warn you", () => {
    createOneDiscountEntry();

    cy.get("[data-cy=submit-entire-flow]").should("not.exist");
    cy.get("[data-cy=discounts-items-container]").contains("Require");
    cy.get("[data-cy=discounts-items-container]").contains("discount");

    cy.get("[data-cy=discount-amount]").type("100");
    cy.get("[data-cy=discount-currency]").type("EUR");

    cy.get("[data-cy=submit-entire-flow").should("exist");
    cy.get("[data-cy=discounts-items-container]").should("not.contain", "Require");
    cy.get("[data-cy=discounts-items-container]").contains("discount");

    cy.get("[data-cy=discount-amount]").focus().clear().type("1000000");
    cy.get("[data-cy=discounts-items-container]").contains("Require");
    cy.get("[data-cy=discounts-items-container]").contains("delete");
  });

  it("only when the discount amount is > 0, the total amount should change and gets affected", () => {
    createOneDiscountEntry();

    cy.get("[data-cy=discounts-items-container]").contains("587");

    cy.get("[data-cy=discount-amount]").type("100");
    cy.get("[data-cy=discount-currency]").type("EUR");

    cy.get("[data-cy=discounts-items-container]").contains("487");

    cy.get("[data-cy=discount-amount]").type("-100");

    cy.get("[data-cy=discounts-items-container]").contains("587");
  });
});
