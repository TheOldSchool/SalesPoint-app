<template lang="html">
  <div class="container" id="market-car">

    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <div class="container">
          <table>
            <tr>
              <td>
                <button class="btn" @click="changeCar(-1)">
                  <img src="https://image.flaticon.com/icons/svg/254/254437.svg" alt="back" width="20px">
                </button>
              </td>
              <td>
                <h5><b>Carrito</b></h5>
              </td>
              <td>
                <button class="btn" @click="changeCar(1)">
                  <img src="https://image.flaticon.com/icons/svg/254/254428.svg" alt="next" width="20px">
                </button>
              </td>
            </tr>
          </table>
        </div>
      </li>

      <li class="list-group-item">
        <small>Lista #{{getIndex+1}} <i>hace 1 hora</i></small>
          <table>
            <tr>
              <td class="text-right">
                <button class="btn" @click="addCar()">
                  <img src="https://image.flaticon.com/icons/svg/1828/1828753.svg" alt="add" width="30px">
                </button>
              </td>
              <td>
                <button class="btn" @click="removeCar()">
                  <img src="https://image.flaticon.com/icons/svg/1828/1828804.svg" alt="rm" width="30px">
                </button>
              </td>
            </tr>
          </table>
      </li>

      <li id="list-orders">
        <ul class="list-group">
          <li v-for="(order, index) in getOrders" v-bind:key="index"
            class="list-group-item justify-content-between orders" @click="editOrder(index)">

            <div class="block">
              <span class="order-number">Orden #{{index+1}}</span>
              <span class="badge badge-primary badge-pill">{{order.len()}}</span>
            </div>
            <div class="block products">
              <p v-for="(product, index) in order.getProducts()" v-bind:key="index"><small>{{ product.name }}</small></p>
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
    </table>

    <div class="btn-group" role="group" aria-label="Basic example" style="width: 100%;">
      <button class="btn btn-secondary" @click="generate_ticket()">
        Ticket
      </button>
      <button class="btn btn-primary" @click="make_purchases()">
        Cobrar
      </button>
    </div>

  </div>
</template>

<script>
import Car from '@/res/Car.js';

export default {
  name: 'MarketCar',
  data: function() {
    return { src: '' }
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
    addCar: function() {
      this.$store.dispatch('addCar_action', new Car());
    },
    editOrder: function(index) {
      this.$store.dispatch('editOrder_action', index);
    },
    changeCar: function(avance) {
      this.$store.dispatch('changeCar_action', avance);
    },
    removeCar: function() {
      this.$store.dispatch('removeCar_action');
    },
    make_purchases: async function() {
      const route = '/sale';
      const user = this.$getter.getUser();
      const sales = {
        sale: this.$store.getters.getCar.getSale(user),
        cart: this.$store.getters.getCar.getIngredientsNeeded()
      };

      const response = await this.$requester.post(route, sales);
      console.log(response);
      this.$store.dispatch('makePurchases_action');
    },
    generate_ticket: async function() {
      const car = this.$store.getters.getCar;
      const user = this.$getter.getUser();
      let inventory = [];
      let content = [];
      inventory.push(['# Orden', 'Clave', 'Nombre', 'Precio', 'Responsable']);
      for(let i = 0; i < car.orders.length; i++) {
        const order = car.orders[i];
        for(let j = 0; j < order.products.length; j++) {
          content.push([
            (i+1),
            order.products[j].key,
            order.products[j].name,
            order.products[j].price,
            (user.username) ? user.username : user.name
          ]);
        }
      }

      content.push(['Subtotal', '', '', '', '$'+car.getSubtotal()]);
      content.push(['Descuento', '', '', '', '$'+car.getDiscount()]);
      content.push(['Total', '', '', '', '$'+car.getTotal()]);
      inventory.push(content);
      this.src = await this.$reports.write('sell_ticket.pdf', inventory);
    }
  },
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

.products p {
  padding: 0;
  margin: 0;
} .orders {
  cursor: pointer;
}

#buttons-car {
  display: block;
  width: 100% !important;
}
</style>
