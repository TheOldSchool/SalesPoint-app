<template>
  <div id="template-product" class="container">
    <form v-on:submit.prevent="add_product">
      <h4><b>Panel de control</b></h4>
      <table>
        <tr>
          <td>
            <img src="https://image.flaticon.com/icons/svg/1573/1573347.svg" 
                 alt="icon" width="40px">
          </td>
          <td class="align-bottom">
            <h5><b>Productos</b></h5>
          </td>
        </tr>
      </table>

      <div class="form-group">
        <label for="product_img">Icono de Producto</label>
        <input type="file" class="form-control-file" id="product_img">
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label for="name_product">Nombre</label>
          <input type="text" class="form-control" id="name_product" required>
        </div>
      </div>

      <div class="form-group">
        <label for="desc_product">Descripción</label>
        <textarea name="desc_product" id="desc_product" class="form-control" required></textarea>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="price_product">Precio</label>
          <input type="text" class="form-control" id="price_product" required>
        </div>
        <div class="form-group col-md-6">
          <label for="ingredients_product">Ingredientes</label>
          <select id="ingredients_product" class="form-control">
            <option selected>Choose...</option>
            <option>...</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label for="menu_type">Categoria</label>
          <select id="menu_type" class="form-control" name="name_type">
            <option v-for="category in categories" :value="category.type" 
              v-bind:key="category.type">
              {{category.name}}
            </option>
          </select>
        </div>
      </div>

      <button type="submit" id="add-product"
        class="btn btn-primary">
          Agregar Producto
      </button>
    </form>
  </div>
</template>

<script>
import Product from "@/res/Product.js";
export default {
  name: "TemplateProduct",
  data: function() {
    return {
      categories: [
        {name: 'Desayunos', type: 0},
        {name: 'Entradas', type: 1},
        {name: 'Platillo principal', type: 2},
        {name: 'Cena', type: 3},
        {name: 'Postres', type: 4},
        {name: 'Bebidas', type: 5},
      ]
    }
  },
  methods: {
    send_product: async function(send_product) {
      const URL = 'http://localhost:3000/api/add_product';
      const data = {product: send_product};

      let options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      let response = await fetch(URL, options);
      let json = await response.json();
      this.validate_response(json);
    },
    add_product: function(event) {
      let key = this.generate_key();
      let name = event.target.name_product.value;
      let desc = event.target.desc_product.value;
      let price = event.target.price_product.value;
      let ingredients = event.target.ingredients_product.value;
      let category = event.target.name_type.value;
      let company = null;

      if(localStorage.getItem('company') === undefined) {
        company = sessionStorage.getItem('company');
      } else {
        company = localStorage.getItem('company');
      }

      let product = new Product(key, name, price, company);
      product.setDescription(desc);
      product.setIngredients(ingredients);
      product.setCompany(company);
      product.setCategory(category);
      this.send_product(product);
    },
    generate_key: function() {
      let mask = 'abcdefghijklmnopqrstuvwxyz';
      mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      mask += '0123456789';
      let generated_key = '';

      for (var i = 15; i > 0; --i)
        generated_key += mask[Math.floor(Math.random() * mask.length)];
      return generated_key;
    },
    validate_response: function(acuse) {
      console.log(acuse);
    }
  }
};
</script>

<style scoped>
#template-product {
  height: 100vh;
  padding-top: 40px;
  background-color: #fff;
}

form {
  padding-bottom: 40px;
}

table tr td{
  padding: 30px 10px;
}

#desc-product {
  resize: none;
}

#add-product {
  width: 100%;
}
</style>
