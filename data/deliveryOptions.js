export const deliveryOptions = [
  {
    id: "1",
    deliveryDate: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDate: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDate: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  for (let i = 0; i < deliveryOptions.length; i++) {
    if (deliveryOptions[i].id === deliveryOptionId) {
      return deliveryOptions[i];
    }
  }
  return deliveryOptions[0];
}
