class Order {
  constructor(product, amount) {
    this.product = product;
    this.amount = amount;
  }

  setAmount(amount) {
    this.amount = amount;
  }
}

module.exports = Order;
