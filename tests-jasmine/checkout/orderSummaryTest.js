import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage } from "../../data/cart.js";

describe("test suite: renderOrderSummary()", () => {
  it("display the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
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
      ]);
    });
    console.log(JSON.stringify(localStorage.getItem("cart")));
    document.querySelector(".js-test-container").innerHTML = `
      <div class="js-test-container"></div>
    `;
    loadFromStorage();
    renderOrderSummary();
  });
});
