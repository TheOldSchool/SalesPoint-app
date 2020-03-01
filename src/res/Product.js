class Product {
  constructor(key, name, price) {
    this.key = key;
    this.name = name;
    this.price = price;
    this.desc = '';
    this.amount = '';
    this.ingredients = '';
    this.company = '';
    this.category = '';
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
}

module.exports = Product;
