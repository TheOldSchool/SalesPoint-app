<template lang="html">
  <div id="market" class="row">
    <div class="col-sm-2">
      <aside id="nav-menu" v-show="toggle_categories">
        <Menu @changeMenu="changeMenu" />
      </aside>
    </div>
    <div class="col">
      <ListMenu :menu="menu" :edit_page="false" :delete_access="false"
        @animation_ring="animation_ring" />

      <div id="add-order-zone" class="container">
          <div id="list-zone" class="container bg-light" v-show="show_orders">
            <ul id="order-list" class="list-group list-group-flush">

              <li v-for="(product, index) in getProducts" v-bind:key="index"
                class="list-group-item bg-light">
                {{product.name}}
                <span class="badge badge-danger badge-pill"
                  @click="$store.getters.getOrder.remove(index)">
                  X
                </span>
              </li>

            </ul>

            <button id="confirm-order" class="btn btn-success btn-block" @click="send_to_car">
              Confirmar
            </button>
          </div>

        <button type="button" class="btn btn-warning"
          id="add-order" @click="show_orders = !show_orders">
          <div class="container">
            <img src="../assets/icons/add-white.svg" alt="agregar" width="20px">
              Añadir orden ${{ get_order_price }}
          </div>

        </button>
      </div>

      <div class="alert alert-danger" role="alert" @click="show_alert = false" v-show="show_alert">
        <h4 class="alert-heading">Ingredientes insuficientes</h4>
        {{ msg_alert }}
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/menus/Menu.vue';
import ListMenu from "@/components/menus/ListMenu.vue";
import Requester from '@/res/Requester.js';

export default {
  name: 'Market',
  data: function() {
    return {
      menu: null,
      show_orders: false,
      show_alert: false,
      msg_alert: '',
      requester: new Requester()
    }
  },
  props: ['toggle_categories'],
  components: {
    Menu,
    ListMenu
  },
  computed: {
    get_order_price: function() {
      return this.$store.getters.getOrder.getTotalPrice();
    },
    getProducts: function() {
      return this.$store.getters.getOrder.getProducts();
    },
  },
  methods: {
    changeMenu: function(menu) {
      this.menu = menu;
    },
    animation_ring: function() {
      const button = document.getElementById('add-order');
      button.classList.add('animate-button');

      button.addEventListener('animationend', function() {
        button.classList.remove('animate-button');
      });
    },
    send_to_car: async function() {
      const response = await this.registerOrder();
      if(response.imposible.length == 0)
        await this.$store.dispatch('addOrder_action');
      else {
        this.msg_alert = '';
        for(let i = 0; i < response.imposible.length; i++)
          this.msg_alert += `Se necesitan : ${response.imposible[i][2]} ${response.imposible[i][0]} y solo hay ${response.imposible[i][1]} en existencia\n`;
        this.show_alert = true;
      }
    },
    registerOrder: async function() {
      const route = '/verifysale';
      const order = this.$store.getters.getOrder.getProducts();
      const cart = this.$store.getters.getCar.getIngredientsNeeded();

      const cart_order = {
        cart: cart.concat(order)
      };

      const response = await this.requester.post(route, cart_order);
      return response;
    }
  },
}
</script>

<style lang="css" scoped>
@keyframes shake {
  0%   {transform: rotate(-4deg);}
  10%  {transform: rotate(-8deg);}
  20%  {transform: rotate(-4deg);}
  30% {transform: rotate(0deg);}
  40% {transform: rotate(4deg);}
  50% {transform: rotate(8deg);}
  60% {transform: rotate(4deg);}
  70% {transform: rotate(0deg);}
  80% {transform: rotate(4deg);}
  90% {transform: rotate(0deg);}
  100% {transform: rotate(-4deg);}
}

#market {
  height: 100vh;
  margin-bottom: 500px;
  background-color: #fff;
}

aside {
  height: 100%;
} #nav-menu {
  padding-top: 20px;
}

#nav-car {
  position: fixed;
  right: 0;
  z-index: 1;
  background-color: white;
}

.row {
  width: 100%;
}

.animate-button {
  animation-name: shake;
  animation-duration: 500ms;
  animation-timing-function: linear;
}

#add-order-zone {
  position: fixed;
  width: 300px;
  bottom: 0;
  margin-bottom: 20px;
} #order-list {
  overflow-y: scroll;
  width: 100%;
  height: 200px;
  border-radius: 10px;
} #confirm-order {
  margin: 20px 0px;
} #add-order:hover { }
.badge {
  float: right;
  cursor: pointer;
} #list-zone {
  left: 0;
  width: 300px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px 10px 4px 4px;
  box-shadow: 0px 2px 13px 1px rgba(0,0,0,0.35);
}

.alert {
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
