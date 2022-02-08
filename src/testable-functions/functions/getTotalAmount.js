/**
 *
 * @param items imported file with mocked shoes
 */
export const getTotalAmount = items =>
  items.map(item => item.quantity * Number(item.price.amount)).reduce((prev, curr) => prev + curr, 0);
