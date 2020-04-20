<template>
  <div id="template-product" class="container">
    <!-- Altas de productos !-->
    <form v-on:submit.prevent="add_or_update">
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
        <input type="file" class="form-control-file" id="product_img" name="product_img"
          v-if="product == undefined" required>
        <div v-else>
          <img :src="product.photo" alt="perfil" class="rounded" width="20%">
        </div>
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
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">$</div>
            </div>
            <input type="number" class="form-control" id="price" placeholder="65.50" required>
          </div>
        </div>
        <div class="form-group col-md-6">
          <div class="row">

          <div class="col-sm-4">
            <label for="ingredients_product">Ingredientes</label>

            <select id="ingredients_product" class="form-control" name="ingredients_product" v-model="ingredient_index" required>
              <option v-for="(ingredient, index) in ingredients" v-bind:key="index"
                :value="index">
                {{ingredient.name}}
              </option>
            </select>

          </div>

          <div class="col-sm-4">
            <label for="amounts">Cantidad</label>
            <input id="amounts" class="form-control" type="number" name="amounts"
              min="0" placeholder="6" >
          </div>

          <div class="col-sm-4">
            <label for="type_amount">Tipo de unidad</label>
            <select id="type_amount" name="type_amount" class="form-control"
              v-model="getUnits" disabled required>
              <option value="0">Unidades</option>
              <option value="1">Kg.</option>
              <option value="2">Ltrs</option>
            </select>
          </div>
          <button type="button" class="btn btn-block btn-success mt-3" @click="add_ingredient()">
            Agregar
          </button>
        </div>
      </div>
    </div>

      <div class="form-row">
        <div class="form-group col">
          <label for="category">Categoria</label>
          <select id="category" class="form-control" name="category" required>
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

      <input type="submit" id="add-product"
        class="btn btn-primary mt-2" :value="(product != null) ? 'Guardar' : 'Agregar'">
    </form>

    <div class="alert" :class="{ 'alert-primary': okay, 'alert-danger': !okay }" role="alert" 
      v-show="alert_show" @click="alert_show = false">
      {{ message_alert }}
    </div>
  </div>
</template>

<script>
import Product from "@/res/Product.js";
import Validator from '@/res/Validator.js';

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
      ingredient_index: 0,
      selected_ingredients: [],
      validator: new Validator()
    }
  },
  props: ['product'],
  methods: {
    send_product: async function(product) {
      // route es la ruta del server a la cual ir
      const route = '/addproduct';

      // Enviar archivos con postFile
      const response = await this.$requester.postFile(route, product);
      this.validate_response(response);
    },
    make_request: async function(route, params) {
      const response = await this.$requester.post(route, params);
      return response;
    },
    add_or_update: function(event) {
      if(this.product != undefined)
        this.update(event);
      else
        this.add_product(event);
    },
    add_product: function(event) {
      const route = '/addhistorical';
      let img = event.target.product_img.files[0];
      const err = this.validator.isEmpty(this.selected_ingredients);

      if(err.length == 0) {
        // Genera un objeto Producto
        let product = new Product(this.$getter, 'add');
        // build para crear su info apartir del event del formulario
        product.build(event, this.selected_ingredients);

        // Enviar imagenes con FormData
        let formData = new FormData();
        formData.append('img', img);
        formData.append('product', JSON.stringify(product.serialize()));
        const historical = this.$historical.renderHistorical(product.serialize().product);
        this.make_request(route, historical);
        this.send_product(formData);
      } else {
        this.okay = false;
        this.alert_show = true;
        this.message_alert = err;
      }
    },
    update: async function(event) {
      const route = '/updproduct';
      const product = new Product(this.$getter, 'upd');
      product.copy(this.product);
      product.build(event, this.selected_ingredients);
      const response = await this.make_request(route, product.serialize());
      const historical = this.$historical.renderHistorical(product.serialize().product);
      this.make_request('/addhistorical', historical);
      this.validate_response(response);
    },
    validate_response: function(response) {
      if(response.length == 0) {
        this.okay = true;
        this.clean();
        this.message_alert = 'Los datos se han agregado exitosamente';
      } else {
        this.okay = false;
        this.message_alert = 'Esto es penoso, por alguna razón no se pudo agregar a este empleado. Intentalo más tarde.';
      }

      this.alert_show = true;
    },
    getIngredients: async function() {
      const route = '/getinventory';
      const params = {
        inventory: {
          type: 'inventory',
          template: { company: this.$getter.getUser().company }
        }
      };

      this.ingredients = await this.make_request(route, params);
    },
    // Se agrega un ingrediente a la lista de ingredientes
    add_ingredient: function() {
      const index = document.getElementById('ingredients_product').value;
      const ingredient = this.ingredients[index].name;
      const key = this.ingredients[index].key;
      const amounts = document.getElementById('amounts').value;
      // name el nombre del ingrediente (se muestra en pantall)
      // amount la cantidad del ingrediente (se muestra en pantalla)
      // key la clave del ingrediente (no se muestra en pantalla)
      if(amounts <= 0) {
        this.okay = false;
        this.alert_show = true;
        this.message_alert = 'Las cantidades en los ingredientes debe ser mayor a 0.';
      } else {
        this.alert_show = false;
        const result = {
          name: ingredient,
          amount: amounts,
          key: key + 'x' + amounts
        };

        this.selected_ingredients.push(result);
        document.getElementById('amounts').value = '';
      }
    },
    // Cada alta se resetean los campos
    clean: function() {
      document.getElementById('name').value = '';
      document.getElementById('desc').value = '';
      document.getElementById('price').value = '';
      document.getElementById('amounts').value = '';
      const img = document.getElementById('product_img');
      if(img != undefined)
        img.value = null;
      this.selected_ingredients = [];
    }
  },
  watch: {
    // Establece los datos del producto a editar
    ingredients: function() {
      if(this.product != undefined) {
        document.getElementById('name').value = this.product.name;
        document.getElementById('desc').value = this.product.desc;
        document.getElementById('price').value = this.product.price;
        document.getElementById('category').value = this.product.category;

        const product_ingredients = this.product.ingredients.split(',');

        for(let i = 0; i < product_ingredients.length; i++) {
          const ingrxamount = product_ingredients[i].split('x');

          for(let j = 0; j < this.ingredients.length; j++) {
            if(this.ingredients[j].key == ingrxamount[0]) {
              const result = {
                name: this.ingredients[j].name,
                amount: ingrxamount[1],
                key: product_ingredients[i]
              };
              this.selected_ingredients.push(result);
            }

          }

        }
      }
    }
  },
  computed: {
    getUnits: function() {
      const ingredient = this.ingredients[this.ingredient_index];
      return (ingredient == undefined) ? 0 : ingredient.units;
    }
  },
  created: async function() {
    await this.getIngredients();
  },
  mounted: function() {
    this.clean();
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
