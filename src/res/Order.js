class Order {
  constructor() {
    this.products = [];
  }

  len() {
    return this.products.length;
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct() {

  }

  getTotalPrice() {
    let total = 0;
    for(let i = 0; i < this.products.length; i++)
      total += parseFloat(this.products[i].price);

    return total;
  }
}

module.exports = Order;
