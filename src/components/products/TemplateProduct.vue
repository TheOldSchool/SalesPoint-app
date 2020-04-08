<template>
  <div id="template-product" class="container">
    <!-- Altas de productos !-->
    <form v-on:submit.prevent="add_product">
      <h4><b>Panel de control</b></h4>
      <table>
        <tr>
          <td>
            <img src="https://image.flaticon.com/icons/svg/1573/1573347.svg" 
                 alt="icon" width="40px" id="img" name="img">
          </td>
          <td class="align-bottom">
            <h5><b>Productos</b></h5>
          </td>
        </tr>
      </table>

      <div class="form-group">
        <label for="photo">Icono de Producto</label>
        <input type="file" class="form-control-file" id="product_img" name="product_img">
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label for="name">Nombre</label>
          <input type="text" class="form-control" id="name" name="name"
            placeholder="Hamburguesa Jumbo" required>
        </div>
      </div>

      <div class="form-group">
        <label for="desc">Descripción</label>
        <textarea name="desc" id="desc" class="form-control"
          placeholder="Deliciosa hamburguesa con doble carne" required></textarea>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="price">Precio</label>
          <input type="text" class="form-control" id="price" placeholder="65.50" required>
        </div>
        <div class="form-group col-md-6">
          <div class="row">

          <div class="col-sm-6">
            <label for="ingredients_product">Ingredientes</label>

            <select id="ingredients_product" class="form-control" name="ingredients_product">
              <option selected>Choose...</option>
              <option v-for="(ingredient, index) in ingredients" v-bind:key="index"
                :value="index">
                {{ingredient.name}}
              </option>
            </select>

          </div>

          <div class="col-sm-6">
            <label for="amounts">Cantidad</label>
            <input id="amounts" class="form-control" type="number" name="amounts"
              placeholder="6">
          </div>
          <div class="container">
            <button type="button" class="btn btn-block btn-success mt-3" @click="add_ingredient()">
              Agregar
            </button>
          </div>
        </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label for="category">Categoria</label>
          <select id="category" class="form-control" name="category">
            <option v-for="category in categories" :value="category.type" 
              v-bind:key="category.type">
              {{category.name}}
            </option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="ingredient bg-danger text-light"
          v-for="(ingredient, index) in selected_ingredients" v-bind:key="index">
          {{ingredient.name}}

          <span class="badge badge-dark-danger">{{ingredient.amount}}</span>
          <span class="badge badge-danger" @click="selected_ingredients.splice(index, 1)">x</span>
        </div>
      </div>

      <button type="submit" id="add-product"
        class="btn btn-primary mt-2">
          Agregar Producto
      </button>
    </form>

    <div class="alert" :class="{ 'alert-primary': okay, 'alert-danger': !okay }" role="alert" 
      v-show="alert_show" @click="alert_show = false">
      {{ message_alert }}
    </div>
  </div>
</template>

<script>
import Product from "@/res/Product.js";

export default {
  name: "TemplateProduct",
  data: function() {
    return {
      // Tipos de productos
      categories: [
        {name: 'Desayunos', type: 0},
        {name: 'Entradas', type: 1},
        {name: 'Platillo principal', type: 2},
        {name: 'Cena', type: 3},
        {name: 'Postres', type: 4},
        {name: 'Bebidas', type: 5},
      ],
      // Cambia color de mensaje
      okay: false,
      // Cambia la visibilidad del mensaje
      alert_show: false,
      // Cambia el texto del mensaje
      message_alert: '',
      ingredients: [],
      selected_ingredients: [],
    }
  },
  methods: {
    send_product: async function(event, product) {
      // route es la ruta del server a la cual ir
      const route = '/addproduct';

      // Enviar archivos con postFile
      const response = await this.$requester.postFile(route, product);
      this.validate_response(event, response);
    },
    make_request: async function(route, params) {
      const response = await this.$requester.post(route, params);
      return response;
    },
    add_product: function(event) {
      // Se genera una key aleatoria con $store
      let key = this.$getter.getRandomKey();
      let img = event.target.product_img.files[0];
      // Se obtiene el objeto user del login
      const user = this.$getters.getUser();

      // Genera un objeto Producto
      let product = new Product(key, user);
      // build para crear su info apartir del event del formulario
      product.build(event, this.selected_ingredients);
      product.setAction(2);

      // Enviar imagenes con FormData
      let formData = new FormData();
      formData.append('img', img);
      formData.append('product', JSON.stringify(product.serialize()));
      this.send_product(event.target, formData);
    },
    validate_response: function(event, response) {
      if(response.length == 0) {
        this.okay = true;
        this.clean(event);
        this.message_alert = 'Se agregó producto correctamente';
      } else {
        this.okay = false;
        this.message_alert = 'Hubo un problema al agregar el producto';
      }

      this.alert_show = true;
    },
    getIngredients: async function() {
      const route = '/getinventory';
      const params = {
        inventory: {
          type: 'inventory',
          template: { company: this.$getters.getUser().company }
        }
      };

      this.ingredients = await this.make_request(route, params);
    },
    add_ingredient: function() {
      const index = document.getElementById('ingredients_product').value;
      const ingredient = this.ingredients[index].name;
      const key = this.ingredients[index].key;
      const amounts = document.getElementById('amounts').value;
      const result = {
        name: ingredient,
        amount: amounts,
        key: key + 'x' + amounts
      };

      this.selected_ingredients.push(result);
    },
    clean: function(target) {
      console.log(target);
      target.name.value = '';
      target.desc.value = '';
      target.price.value = '';
      target.amounts.value = '';
      target.product_img.value = null;
      this.selected_ingredients = [];
    }
  },
  created: async function() {
    this.getIngredients();
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

.ingredient {
  margin: 0px 6px;
  padding: 4px 6px;
  border-radius: 5px;
} .ingredient .badge {
  cursor: pointer;
}

.badge-dark-danger {
  color: white;
  background-color: #AD2A37;
}

.alert {
  position: fixed;
  bottom: 0;
  width: 70%;
  margin-left: 50%;
  left: -28%;
  margin-bottom: 50px;
}
</style>
