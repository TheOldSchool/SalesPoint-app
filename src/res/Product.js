class Product {
  constructor(getter, oper) {
    this.getter = getter;
    this.oper = oper;
    this.product = {
      key: '',
      name: '',
      price: '',
      desc: '',
      ingredients: '',
      struct_ingredients: [],
      company: '',
      category: '',
      responsable:'',
      photo: 'http://localhost:8000/'
    };
  }

  build(event, ingredients) {
    const target = event.target;
    this.product.key = (this.product.key != '') ?
      this.product.key : this.getter.getRandomKey();
    const user = this.getter.getUser();
    this.product.company = user.company;
    this.product.responsable = user.username;
    this.product.name = (target.name) ? target.name.value : '';
    this.product.price = (target.price) ? target.price.value : '';
    this.product.desc = (target.desc) ? target.desc.value : '';
    this.product.category = (target.category) ? target.category.value : '';
    this.product.struct_ingredients = ingredients;
    this.parseIngredients(ingredients);
  }

  parseIngredients(ingredients) {
    let ingredients_format = '';
    for(let i = 0; i < ingredients.length; i++)
      ingredients_format += ingredients[i].key + ',';
    this.product.ingredients = ingredients_format;
  }

  copy(product) {
    this.product = product;
    console.log(this.product);
  }

  serialize() {
    return {
      product: {
        type: 'product',
        oper: this.oper,
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
