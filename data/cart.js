export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
      quantity: 4,
      deliveryOption: "1",
    },
    {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 2,
      deliveryOption: "2",
    },
  ];
  saveToStorage();
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

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
      deliveryOption: "1",
    });
  }
  saveToStorage();
}

export function deleteFromCart(itemId) {
  for (let index = 0; index < cart.length; index++) {
    if (cart[index].id === itemId) {
      cart.splice(index, 1);
      saveToStorage();
      return true;
    }
  }
  return false;
}

export function totalCartQuantity() {
  let total = 0;
  cart.forEach((cartItem) => {
    total += cartItem.quantity;
  });
  return total;
}

export function updateCartQuantity(productId, value) {
  for (let index = 0; index < cart.length; index++) {
    if (cart[index].id === productId) {
      cart[index].quantity = value;
      break;
    }
  }
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let machingObject;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      machingObject = cart[i];
      break;
    }
  }

  machingObject.deliveryOption = deliveryOptionId;
  saveToStorage();
}
