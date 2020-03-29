class Car {
  constructor() {
    this.orders = [];
    this.subtotal = 0.00;
    this.discount = 0.00;
  }

  getOrders() {
    return this.orders;
  }

  addOrder(order) {
    this.orders.push(order);
  }

  removeOrder(order) {
    this.orders.splice(order.index, 1);
  }

  getDiscount() {
    return this.discount;
  }

  getSubtotal() {
    this.subtotal = 0;
    for(let i = 0; i < this.orders.length; i++) {
      console.log(this.orders[i].getTotalPrice());
      this.subtotal += this.orders[i].getTotalPrice();
    }

    return this.subtotal;
  }

  getTotal() {
    return this.subtotal - this.discount;
  }
}

module.exports = Car;
