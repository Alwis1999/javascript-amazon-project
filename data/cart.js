export const cart = [
  { id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9", quantity: 4 },
  { id: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 2 },
  { id: "54e0eccd-8f36-462b-b68a-8182611d9add", quantity: 4 },
];

export function addToCart(productId) {
  let machItem;
  const getQuantity = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value
  );

  for (let index = 0; index < cart.length; index++) {
    if (cart[index].id === productId) {
      cart[index].quantity += getQuantity;
      machItem = true;
      break;
    }
  }

  if (!machItem) {
    cart.push({
      id: productId,
      quantity: getQuantity,
    });
  }
}

export function deleteFromCart(itemId) {
  for (let index=0; index < cart.length; index++) {
    if (cart[index].id === itemId) {
      cart.splice(index, 1);
      return true;
    }
  }
  return false;
}
