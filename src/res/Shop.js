class Shop {
  constructor(key) {
    this.id = key;
    this.date = (new Date()).toLocaleString();
    this.provider = -1;
    this.status = 0;
    this.type = 0;
    this.price = 0;
    this.iva = 0;
    this.total = 0;
    this.details = '';
    this.company = '';
  }

  serialize() {
    return {
      shop: {
        type: 'shop',
        oper: 'shop',
        template: this
      }
    };
  }
}

module.exports = Shop;
