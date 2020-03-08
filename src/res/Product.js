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
    this.action = null;
    this.responsable = '';
    this.img = null;
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

  setImg(img) {
    this.img = img;
  }
}

module.exports = Product;
