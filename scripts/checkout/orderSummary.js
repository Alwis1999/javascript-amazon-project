import {
  cart,
  deleteFromCart,
  totalCartQuantity,
  updateCartQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { getProductFromId } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

document.querySelector(".js-return-to-home-link").innerHTML =
  totalCartQuantity();

export function renderOrderSummary() {
  const cartHTML = document.querySelector(".js-order-summary");
  cartHTML.innerHTML = "";

  cart.forEach((cartItem) => {
    let product = getProductFromId(cartItem.id);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOption);

    const deliveryDate = dayjs()
      .add(deliveryOption.deliveryDate, "days")
      .format("dddd, MMMM D");

    cartHTML.innerHTML += `
    <div class="cart-item-container js-cart-item-${cartItem.id}">
      <div class="delivery-date">
        Delivery date: ${deliveryDate}
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
          ${deliveryOptionsHTML(cartItem)}
          
        </div>
      </div>
  </div>
    `;
    deleteLink();
  });

  function deliveryOptionsHTML(cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = dayjs().add(deliveryOption.deliveryDate, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const deliveryPrice =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `${formatCurrency(deliveryOption.priceCents)}`;
      const isChecked =
        cartItem.deliveryOption === deliveryOption.id ? "checked" : "";

      html += `
          <div class="delivery-option js-delivery-option"
          data-product-id="${cartItem.id}" data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" ${isChecked}
              class="delivery-option-input"
              name="delivery-option-${cartItem.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                $${deliveryPrice} - Shipping
              </div>
            </div>
          </div>
        `;
    });
    return html;
  }

  function deleteLink() {
    document.querySelectorAll(".js-delete-link").forEach((link) => {
      link.addEventListener("click", () => {
        const itemId = link.dataset.productId;
        deleteFromCart(itemId);
        document.querySelector(`.js-cart-item-${itemId}`).remove();
        document.querySelector(".js-return-to-home-link").innerHTML =
          totalCartQuantity();
        renderPaymentSummary();
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
      const updatedValue = Number(
        document.getElementById(`${cartItemId}`).value
      );
      updateItemQuantity(cartItemId, updatedValue);
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".quantity-input").forEach((link) => {
    link.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const updatedValue = Number(link.value);
        const cartItemId = link.dataset.productId;
        updateItemQuantity(cartItemId, updatedValue);
        renderPaymentSummary();
      }
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
