<template lang="html">
  <div id="header">
    <!-- Contiene barra de busqueda y carrito !-->
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <button id="menu" class="btn" @click="$emit('toggle_categories')">
            <img src="../assets/icons/menu.svg" alt="menu" width="25px" v-show="getCompany != 'SalesPoint'">
            <p><strong class="text-light">{{getCompany}}</strong></p>
          </button>
        </div>
        <div class="col-lg-6">
          <div class="container" v-show="getCompany != 'SalesPoint'">
            <input type="text" name="input-search" id="input-search"
                 placeholder="Buscar">
          </div>
        </div>
        <div class="col-md-3 text-right">
          <div class="dropdown" v-show="getCompany != 'SalesPoint'">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

              <img src="https://image.flaticon.com/icons/svg/1656/1656507.svg" alt="cart"
                class="mr-2" width="20px">
              <b class="text-light">
                Carrito ${{getTotal}} MXN
              </b>
            </button>
            <div class="dropdown-menu">
              <MarketCar />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import MarketCar from '@/components/MarketCar.vue';
import $ from 'jquery';

$(document).ready(function() {
  $('.dropdown-menu').on('click', function (e) {
    e.stopPropagation();
  });
});

export default {
  name: 'Header',
  data: function() {
    return { }
  },
  computed: {
    getTotal: function() {
      let total = this.$store.getters.getTotal;
      if(total != undefined)
        return parseFloat(this.$store.getters.getTotal);
      else
        return 0.00;
    },
    getCompany: function() {
      let user = this.$getter.getUser();
      console.log(user);
      return (user != undefined) ? user.company : 'SalesPoint';
    }
  },
  components: {
    MarketCar
  },
}
</script>

<style lang="css" scoped>
#header {
  width: 100%;
  min-height: 40px;
  background-color: var(--main-green);
  border-bottom: 2px solid var(--dark-green);
} #header img {
  float: left;
} #header p {
  margin-left: 40px;
} #menu {
  height: 45px;
  padding-top: 13px;
} #header > .container {
  padding-bottom: 6px;
}

.col-lg {
  text-align: center;
}

#input-search {
  color: #fff;
  width: 100%;
  border: none;
  margin-top: 8px;
  padding: 4px 10px;
  border-radius: 4px;
  background-color: var(--dark-green);
}

.dropdown span {
  color: var(--darker-green);
}

.dropdown-menu {
  margin-top: 15px;
  box-shadow: 0px 7px 42px -6px rgba(0,0,0,0.40);
}.dropdown button {
  color: #fff;
  margin-top: 6px;
  background-color: transparent;
}
</style>
