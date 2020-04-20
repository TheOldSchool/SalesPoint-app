<template>
  <div id="shopping" class="container">
    <table>
      <tr>
        <td><img src="../assets/icons/buy.svg"
          alt="employee" width="40px"></td>
        <td class="align-middle"><h5><b>Compra</b></h5></td>
      </tr>
    </table>

    <small><i>** Para consultar compras antes realizadas ir a "Historial"</i></small>

    <form @submit.prevent="do_shop">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="id">Folio</label>
          <input type="text" class="form-control" id="id" v-model="shop.id" disabled required>
        </div>
        <div class="form-group col-md-6">
          <label for="date">Fecha</label>
          <input type="text" class="form-control" id="date" v-model="shop.date" disabled required>
        </div>
      </div>

      <div class="form-row">

        <div class="form-group col-md-6">
          <label for="provider">Proveedor</label>
          <select id="provider" name="provider" v-model="shop.provider" class="form-control">
            <option v-for="(provider, index) in providers" v-bind:key="provider.id"
              :value="index">{{provider.name}}</option>
            <option value="-1">Eligir...</option>
          </select>

          <div class="ingredient bg-danger text-light"
          v-for="(ingredient, index) in selected_ingredients" v-bind:key="index">
          {{ingredient.name}}

          <span class="badge badge-dark-danger">{{ingredient.amount}}</span>
          <span class="badge badge-danger" @click="selected_ingredients.splice(index, 1)">x</span>
        </div>

        </div>

        <div class="col-md-3">
          <label for="ingredients_product">Ingredientes</label>

          <select id="ingredients_product" class="form-control" name="ingredients_product" required>
            <option selected>Choose...</option>
            <option v-for="(ingredient, index) in ingredients" v-bind:key="index"
              :value="index">
              {{ingredient.name}}
            </option>
          </select>

        </div>

        <div class="col-md-3">
          <label for="amounts">Cantidad</label>
          <input id="amounts" class="form-control" type="number" name="amounts"
            placeholder="6" >

          <button type="button" class="btn btn-block btn-success mt-3" @click="add_ingredient()">
            Agregar
          </button>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="status">Estado de pago</label>
          <select id="status" name="status" class="form-control" v-model="shop.status">
            <option value="0">Completado</option>
            <option value="1">Parcial</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="type">Tipo de pago</label>
          <select id="type" name="type" class="form-control" v-model="shop.type">
            <option value="0">Contado</option>
            <option value="1">Credito</option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <label for="price">Monto</label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">$</div>
            </div>
            <input type="number" class="form-control" id="price" placeholder="350.00" v-model="shop.price" required>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="iva">IVA</label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">$</div>
            </div>
            <input type="number" class="form-control" id="iva" placeholder="16% de Monto"
              v-model="shop.iva" disabled required>
          </div>
        </div>
        <div class="form-group col-md-6">
          <label for="total">Total</label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">$</div>
            </div>
            <input type="text" class="form-control" id="total" placeholder="IVA + Monto"
              v-model="shop.total" disabled required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="details">Detalles</label>
        <textarea id="details" name="details" rows="6" class="form-control"
          v-model="shop.details" required></textarea>
      </div>

      <input type="submit" value="Comprar" class="btn btn-primary btn-block">
    </form>

    <div class="alert" :class="{ 'alert-primary': okay, 'alert-danger': !okay }" role="alert" 
        v-show="alert_show" @click="alert_show = false">
        {{ message_alert }}
      </div>

  </div>
</template>

<script>
import Shop from '@/res/Shop.js';

export default {
  name: 'Shopping',
  data: function() {
    return {
      okay: true,
      alert_show: false,
      message_alert: '',
      providers: [],
      ingredients: [],
      selected_ingredients: [],
      shop_ingredients: '',
      shop: new Shop(this.$getter.getRandomKey()),
    }
  },
  methods: {
    make_request: async function(route, params) {
      const response = await this.$requester.post(route, params);
      return response;
    },
    do_shop: async function() {
      const route_shop = '/addshop';
      const route = '/addhistorical';

      this.shop.company = this.$getter.getUser().company;
      this.shop.provider = this.providers[this.shop.provider].name;

      const shop_bundle = this.shop.serialize();
      shop_bundle.ingredients = [{ ingredients: this.shop_ingredients }];

      const response = await this.$requester.post(route_shop, shop_bundle);

      const historical = this.$historical.renderHistorical(this.shop.serialize().shop);
      const response_htl = await this.make_request(route, historical);

      if(response.length == 0 && response_htl.length == 0)
        this.validate_response(response);
      else
        this.validate_response(response_htl);
    },
    validate_response: function(response) {
      if(response.length == 0) {
        this.okay = true;
        this.alert_show = true;
        this.message_alert = 'Los datos se han agregado exitosamente';
        this.shop = new Shop(this.$getter.getRandomKey());
        this.selected_ingredients = [];
        this.shop_ingredients = '';
        document.getElementById('amounts').value = '';
      } else {
        this.okay = false;
        this.alert_show = true;
        this.message_alert = 'Esto es penoso, por alguna razón no se pudo agregar a este empleado. Intentalo más tarde.';
      }
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
    add_ingredient: function() {
      const index = document.getElementById('ingredients_product').value;
      const ingredient = this.ingredients[index].name;
      const key = this.ingredients[index].key;
      const amounts = document.getElementById('amounts').value;
      // name el nombre del ingrediente (se muestra en pantall)
      // amount la cantidad del ingrediente (se muestra en pantalla)
      // key la clave del ingrediente (no se muestra en pantalla)
      const result = {
        name: ingredient,
        amount: amounts,
        key: key + 'x' + amounts
      };

      this.shop_ingredients += key + 'x' + (-1 * amounts) + ',';
      this.selected_ingredients.push(result);
    },


  },
  watch: {
    'shop.price': function() {
      if(isNaN(parseFloat(this.shop.price))) {
        this.shop.iva = '';
        this.shop.total = '';
      } else {
        this.shop.iva = parseFloat(this.shop.price) * 0.16;
        this.shop.total = parseFloat(this.shop.price) + parseFloat(this.shop.iva);
      }
    }
  },
  created: async function() {
    const route = '/getallproviders';
    const params = {
      provider: {
        type: 'provider',
        template: { company: this.$getter.getUser().company }
      }
    };
    this.providers = await this.make_request(route, params);
    this.getIngredients();
  }
}
</script>

<style scoped>
h5 {
  padding: 0px 15px;
}

form {
  margin-top: 30px;
}

small {
  display: block;
  margin-top: 20px;
}

#details {
  resize: none;
}

.alert {
  position: fixed;
  bottom: 0;
  width: 70%;
  margin-left: 50%;
  left: -28%;
  margin-bottom: 50px;
}

.ingredient {
  display: inline-block;
  margin: 8px 6px 10px 6px;
  padding: 4px 6px;
  border-radius: 5px;
} .ingredient .badge {
  cursor: pointer;
}

.badge-dark-danger {
  color: white;
  background-color: #AD2A37;
}

</style>
