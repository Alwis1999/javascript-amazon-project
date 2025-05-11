import { cart } from "../../data/cart.js";
import { getProductFromId } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  let totalPriceCents = 0;
  let totalShippingCents = 0;

  cart.forEach((cartItem) => {
    let machingProduct = getProductFromId(cartItem.id);
    totalPriceCents += machingProduct.priceCents * cartItem.quantity;
    totalShippingCents += getDeliveryOption(cartItem.deliveryOption).priceCents;
  });

  const totalBeforeTax = totalPriceCents + totalShippingCents;
  let taxCents = totalBeforeTax * 0.1;
  let totalCents = totalBeforeTax + taxCents;

  const html = `
  <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${cart.length}):</div>
          <div class="payment-summary-money">$${formatCurrency(
            totalPriceCents
          )}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(
            totalShippingCents
          )}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(
            totalBeforeTax
          )}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(
            totalCents
          )}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = html;
}
