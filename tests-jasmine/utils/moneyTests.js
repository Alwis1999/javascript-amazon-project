import { formatCurrency } from "../../scripts/utils/money.js";

describe("test suit: formatCurruncy", () => {
  it("convert cents into dollers", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });

  it("works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  it("round up nearst cents", () => {
    expect(formatCurrency("2000.5")).toEqual("20.01");
  });
});
