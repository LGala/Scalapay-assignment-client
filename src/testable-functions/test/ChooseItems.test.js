import { getItemsToBuy } from "../functions/ChooseItems";
import { itemsData } from "../../../src/assets/mocks/shoes";

describe("getItems function", () => {
  test("getItemsTobuy should be empty when the cart is empty", () => {
    const cart = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    expect(getItemsToBuy(cart, itemsData)).toStrictEqual([]);
  });

  test("getItemsTobuy should have the same sku and quantity the cart have", () => {
    const cart = { 0: 0, 1: 2, 2: 0, 3: 1, 4: 0, 5: 0 };

    expect(getItemsToBuy(cart, itemsData)).toStrictEqual([
      {
        gtin: "UPC",
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
        gtin: "UPC",
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
    ]);
  });
});
