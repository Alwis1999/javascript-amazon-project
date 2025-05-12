import { formatCurrency } from "../scripts/utils/money.js";

console.log("test suit: formatCurruncy");

console.log("convert cents into dollers");
if (formatCurrency(2005) === "20.05") {
  console.log("passed");
} else {
  console.log("fail");
}

console.log("works with 0");
if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("fail");
}

console.log("round up nearst cents");
if (formatCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("fail");
}
