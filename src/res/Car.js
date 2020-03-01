class Car {
  constructor() {
    this.orders = [];
    this.subtotal = 0;
    this.discount = 0;
  }

  addOrder(order) {
    this.orders.push(order);
  }

  removeOrder(order) {
    this.orders.splice(order.index, 1);
  }

  getTotal() {
    return this.subtotal - this.discount;
  }
}

module.exports = Car;
