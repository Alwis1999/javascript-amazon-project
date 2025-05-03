export const cart = [];

export function addToCart(productId) {
  let machingItem;
  const getQuanity = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value
  );

  for (let index = 0; index < cart.length; index++) {
    if (cart[index].id === productId) {
      cart[index].quantity += getQuanity;
      machingItem = true;
      break;
    }
  }

  if (!machingItem) {
    cart.push({
      id: productId,
      quantity: getQuanity,
    });
  }
}
