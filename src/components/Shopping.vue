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
            <option value="-1">Otro...</option>
          </select>
        </div>
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

      const response = await this.$requester.post(route_shop, this.shop.serialize());

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
      } else {
        this.okay = false;
        this.alert_show = true;
        this.message_alert = 'Esto es penoso, por alguna razón no se pudo agregar a este empleado. Intentalo más tarde.';
      }
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

</style>
