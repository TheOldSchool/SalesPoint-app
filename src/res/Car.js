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

  getProducts() {
    let products = '';
    for(let i = 0; i < this.orders.length; i++) {
      products += 'Orden #' + (i+1) + ' :\n';
      const order_products = this.orders[i].getProducts();
      for(let j = 0; j < order_products.length; j++)
        products += order_products[j].name + '\t' + order_products[j].price + '\n';
      products += '\n';
    }

    return products;
  }

  getSale(user) {
    const products = this.getProducts();
    const subtotal = this.getSubtotal();
    const discount = this.getDiscount();
    const total = this.getTotal();
    const company = user.company;
    const responsable = (user.username) ? user.username : user.name;
    const action = 'Venta de productos';
    const state = 1;

    return {
      type: 'historical',
      template: {
        key: this.getRandomKey(),
        company: company,
        action: action,
        responsable: responsable,
        details: `Se realizo la venta de : \n\n${products}\n\nPor:\n\nSubtotal: ${subtotal}\nDescuento: ${discount}\nTotal: ${total}\n`,
        states: state,
        time: (new Date()).toLocaleString()
      }
    };
  }

  getIngredientsNeeded() {
    let ingredients = [];
    for(let i = 0; i < this.orders.length; i++)
      ingredients = ingredients.concat(this.orders[i].getProducts());

    return ingredients;
  }

  getRandomKey() {
    let mask = 'abcdefghijklmnopqrstuvwxyz';
    mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    mask += '0123456789';
    let generated_key = '';

    for (var i = 15; i > 0; --i)
      generated_key += mask[Math.floor(Math.random() * mask.length)];
    return generated_key;
  }
}

module.exports = Car;
