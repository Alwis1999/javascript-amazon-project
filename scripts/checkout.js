import {
  cart,
  deleteFromCart,
  totalCartQuantity,
  updateCartQuantity,
} from "../data/cart.js";
import { getProductFromId } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

document.querySelector(".js-return-to-home-link").innerHTML =
  totalCartQuantity();

function cartRender() {
  const cartHTML = document.querySelector(".js-order-summary");
  cartHTML.innerHTML = "";
  cart.forEach((cartItem) => {
    let product = getProductFromId(cartItem.id);
    cartHTML.innerHTML += `
    <div class="cart-item-container js-cart-item-${cartItem.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${product.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link"
            data-product-id="${cartItem.id}">
              Update
            </span>
            <input class="quantity-input" data-product-id="${
              cartItem.id
            }" id="${cartItem.id}">
            <span class="save-quantity-link js-save-link link-primary" data-product-id="${
              cartItem.id
            }">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link"
              data-product-id="${cartItem.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input js-delivery-option-input"
              name="delivery-option-${cartItem.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${cartItem.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${cartItem.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
    `;
    deleteLink();
  });
}

cartRender();

function deleteLink() {
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const itemId = link.dataset.productId;
      deleteFromCart(itemId);
      document.querySelector(`.js-cart-item-${itemId}`).remove();
      document.querySelector(".js-return-to-home-link").innerHTML =
        totalCartQuantity();
    });
  });
}

document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const cartId = link.dataset.productId;
    const container = document.querySelector(`.js-cart-item-${cartId}`);
    container.classList.add("is-editing-quantity");
  });
});

function updateItemQuantity(cartItemId, updatedValue) {
  if (updatedValue > 0) {
    const container = document.querySelector(`.js-cart-item-${cartItemId}`);
    updateCartQuantity(cartItemId, updatedValue);
    container.classList.remove("is-editing-quantity");
    document.querySelector(
      `.js-cart-item-${cartItemId} .quantity-label`
    ).innerHTML = updatedValue;
  } else {
    deleteFromCart(itemId);
    document.querySelector(`.js-cart-item-${itemId}`).remove();
  }
  document.querySelector(".js-return-to-home-link").innerHTML =
    totalCartQuantity();
}

document.querySelectorAll(".js-save-link").forEach((save) => {
  save.addEventListener("click", () => {
    const cartItemId = save.dataset.productId;
    const updatedValue = Number(document.getElementById(`${cartItemId}`).value);
    updateItemQuantity(cartItemId, updatedValue);
  });
});

document.querySelectorAll(".quantity-input").forEach((link) => {
  link.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const updatedValue = Number(link.value);
      const cartItemId = link.dataset.productId;
      updateItemQuantity(cartItemId, updatedValue);
    }
  });
});
