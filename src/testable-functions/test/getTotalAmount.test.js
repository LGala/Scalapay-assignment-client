import { getTotalAmount } from "../functions/getTotalAmount";

describe("getTotalAmount function", () => {
  test("getTotalAmount should be 0 when the item array is empty", () => {
    expect(getTotalAmount([])).toStrictEqual(0);
  });

  test("getTotalAmount should have the sum of quantity times the price for every item", () => {
    expect(
      getTotalAmount([
        {
          gtin: "111",
          price: {
            amount: "100",
            currency: "EUR"
          },
          name: "Air Max Deluxe",
          category: "Sport",
          subcategory: ["Shoes"],
          sku: "1",
          brand: "Nike",
          quantity: 2
        },
        {
          gtin: "333",
          price: {
            amount: "90",
            currency: "EUR"
          },
          name: "Air Max 270",
          category: "Sport",
          subcategory: ["Shoes"],
          sku: "3",
          brand: "Nike",
          quantity: 1
        }
      ])
    ).toStrictEqual(100 * 2 + 90 * 1);
  });
});
