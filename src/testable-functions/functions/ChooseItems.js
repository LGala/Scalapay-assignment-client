/**
 *
 * @param cart Object with sku as a key and quantity as a value of the current choosen products
 * @param itemsData imported file with mocked shoes
 * @return a subset of itemsData with quantity as attribute other the attribute already present in itemsData and the
 *         imageName attribute removed
 */
export const getItemsToBuy = (cart, itemsData) =>
  Object.entries(cart)
    .filter(([_, quantity]) => quantity)
    .map(([sku, quantity]) => ({
      ...itemsData[sku],
      quantity: quantity
    }))
    .map(({ imageName, ...otherAttributes }) => otherAttributes);
