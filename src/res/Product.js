class Product {
  constructor(key, user) {
    this.product = {
      key: key,
      name: '',
      price: '',
      desc: '',
      amount: '',
      ingredients: '',
      company: user.company,
      category: '',
      action: null,
      responsable: user.company,
      photo: 'http://localhost:8000/'
    };
  }

  build(event, ingredients) {
    const target = event.target;
    this.product.name = (target.name) ? target.name.value : '';
    this.product.price = (target.price) ? target.price.value : '';
    this.product.desc = (target.desc) ? target.desc.value : '';
    this.product.amount = (target.amount) ? target.amount.value : '';

    let ingredients_format = '';
    console.log('FORMAT: ', ingredients);
    for(let i = 0; i < ingredients.length; i++)
      ingredients_format += ingredients[i].key + ',';
    this.product.ingredients = ingredients_format;

    this.product.category = (target.category) ? target.category.value : '';
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

  getName() {
    return this.product.name;
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
