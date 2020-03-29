<template lang="html">
  <div class="container" id="market-car">

    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <h5><b>Carrito</b></h5>
      </li>

      <li class="list-group-item">
        <small>Lista #{{getIndex+1}} <i>hace 1 hora</i></small>
      </li>

      <li id="list-orders">
        <ul class="list-group">
          <li v-for="(order, index) in getOrders" v-bind:key="index"
            class="list-group-item d-flex justify-content-between align-items-center">

            <div class="block">
              <span class="order-number">Orden #{{index+1}}</span>
              <span class="badge badge-primary badge-pill">{{order.len()}}</span>
            </div>

          </li>
        </ul>

      </li>
    </ul>

    <table>
      <tr>
        <td><span>Subtotal</span></td>
        <td class="text-right" >${{getSubtotal}}</td>
      </tr>
      <tr>
        <td><span>Descuento</span></td>
        <td class="text-right" >${{getDiscount}}</td>
      </tr>
      <tr>
        <td><b><span>Total</span></b></td>
        <td class="text-right" >
          <b><span>${{getTotal}}</span></b>
        </td>
      </tr>
      <tr>
        <td>
          <button class="btn btn-secondary">
            Ticket
          </button>
        </td>
        <td>
          <button class="btn btn-primary" @click="make_purchases()">
            Cobrar
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Car from '@/res/Car.js';

export default {
  name: 'MarketCar',
  data: function() {
    return { }
  },
  computed: {
    getTotal: function() {
      return this.$store.getters.getTotal;
    },
    getDiscount: function() {
      return this.$store.getters.getDiscount;
    },
    getSubtotal: function() {
      return this.$store.getters.getSubtotal;
    },
    getOrders: function() {
      return this.$store.getters.getOrders;
    },
    getIndex: function() {
      return this.$store.getters.getIndex;
    },
    getProducts: function() {
      return this.$store.getters.getProducts;
    }
  },
  methods: {
    make_purchases: function() {
      this.$store.dispatch('makePurchases_action');
    }
  },
  created: function() {
    this.$store.dispatch('addCar_action', new Car());
  }
}
</script>

<style lang="css" scoped>
h5 {
  padding-top: 10px;
}

table {
  bottom: 0;
  width: 100%;
} table tr td {
  width: 50%;
} .btn-primary {
  width: 100%;
}

.order-number {
  margin-right: 20px;
}

#list-orders {
  height: 140px;
  overflow-y: scroll;
}

.block {
  display: block !important;
  width: 100%;
}
</style>
