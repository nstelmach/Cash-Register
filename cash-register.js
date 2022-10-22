function checkCashRegister(price, cash, cid) {
  let Currency = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    "ONE HUNDRED": 100,
  };

  let Quantity = {
    PENNY: Math.round(cid[0][1] / 0.01),
    NICKEL: Math.round(cid[1][1] / 0.05),
    DIME: Math.round(cid[2][1] / 0.1),
    QUARTER: Math.round(cid[3][1] / 0.25),
    ONE: Math.round(cid[4][1] / 1),
    FIVE: Math.round(cid[5][1] / 5),
    TEN: Math.round(cid[6][1] / 10),
    TWENTY: Math.round(cid[7][1] / 20),
    "ONE HUNDRED": Math.round(cid[8][1] / 100),
  };

  let change = cash - price;

  let changeArray = cid.reverse().reduce((previousValue, item) => {
    let key = item[0];
    let currency = Currency[key];
    let quantity = Quantity[key];

    if (currency > change || quantity === 0) {
      return previousValue;
    }

    let quantityOfChange = Math.floor(change / currency);

    if (quantity <= quantityOfChange) {
      let amount = currency * quantity;
      change = (change - amount).toFixed(2);
      Quantity[key] -= quantity;
      return [...previousValue, [key, amount]];
    } else {
      let amount = currency * quantityOfChange;
      change = (change - amount).toFixed(2);
      Quantity[key] -= quantityOfChange;
      return [...previousValue, [key, amount]];
    }
  }, []);

  if (change > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  for (let key in Quantity) {
    if (Quantity[key] > 0) {
      return { status: "OPEN", change: changeArray };
    }
  }

  return { status: "CLOSED", change: cid.reverse() };
}
