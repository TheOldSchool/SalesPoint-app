<template lang="html">
  <div id="market" class="row">
    <div class="col-sm-2">
      <aside id="nav-menu">
        <Menu @changeMenu="changeMenu" />
      </aside>
    </div>
    <div class="col">
      <ListMenu :menu="menu" :edit_page="false" :delete_access="false"
        @pushing_product="prepare_product" />
      <button type="button" class="btn btn-warning" id="add-order" @click="send_to_car">
        <img src="../assets/icons/add-white.svg" alt="agregar" width="20px">
        Añadir orden ${{ get_order_price }}
      </button>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/menus/Menu.vue';
import ListMenu from "@/components/menus/ListMenu.vue";
import Order from '@/res/Order.js';

export default {
  name: 'Market',
  data: function() {
    return {
      menu: null,
      actual_order: new Order()
    }
  },
  components: {
    Menu,
    ListMenu
  },
  computed: {
    get_order_price: function() {
      return this.actual_order.getTotalPrice();
    }
  },
  methods: {
    changeMenu: function(menu) {
      this.menu = menu;
    },
    prepare_product: function(selected_product) {
      this.actual_order.addProduct(selected_product);
      const button = document.getElementById('add-order');
      button.classList.add('animate-button');

      button.addEventListener('animationend', function() {
        button.classList.remove('animate-button');
      });
    },
    send_to_car: function() {
      this.$store.dispatch('addOrder_action', this.actual_order);
      this.actual_order = new Order();
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

#add-order {
  position: fixed;
  bottom: 0;
  margin-bottom: 20px;
}
</style>
