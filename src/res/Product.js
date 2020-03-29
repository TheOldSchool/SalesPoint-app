class Product {
  constructor(key, company) {
    this.product = {
      key: key,
      name: '',
      price: '',
      desc: '',
      amount: '',
      ingredients: '',
      company: company,
      category: '',
      action: null,
      responsable: '',
      photo: 'http://localhost:8000/'
    };
  }

  build(event, responsable) {
    const target = event.target;
    this.product.name = (target.name) ? target.name.value : '';
    this.product.price = (target.price) ? target.price.value : '';
    this.product.desc = (target.desc) ? target.desc.value : '';
    this.product.amount = (target.amount) ? target.amount.value : '';
    this.product.ingredients = (target.ingredients) ? target.ingredients.value : '';
    this.product.category = (target.category) ? target.category.value : '';
    this.product.responsable = responsable;
  }

  serialize() {
    return {
      product: {
        type: 'product',
        template: this.product
      }
    };
  }

  setName(name) {
    this.name = name;
  }

  setPrice(price) {
    this.price = price;
  }

  setDescription(desc) {
    this.desc = desc;
  }

  setAmount(amount) {
    this.amount = amount;
  }

  setIngredients(ingredients) {
    this.ingredients = ingredients;
  }

  setCompany(company) {
    this.company = company;
  }

  setCategory(category) {
    this.category = category;
  }

  setAction(action) {
    this.action = action;
  }

  setResponsable(responsable) {
    this.responsable = responsable;
  }
}

module.exports = Product;
