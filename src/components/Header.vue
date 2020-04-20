<template lang="html">
  <div id="header">
    <!-- Contiene barra de busqueda y carrito !-->
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <button id="menu" class="btn" @click="$emit('toggle_categories')">
            <img src="../assets/icons/menu.svg" alt="menu" width="25px" v-show="session">
            <p><strong class="text-light">{{getCompany}}</strong></p>
          </button>
        </div>
        <div class="col-md-6 text-right">
          <div class="dropdown" v-show="session">
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
    return {
      session: false
    }
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
      return (user != undefined) ? user.company : 'SalesPoint 2020 1.0.0v';
    }
  },
  components: {
    MarketCar
  },
  watch: {
    $route: function() {
      const user = this.$getter.getUser();
      this.session = (user != undefined) ? true : false;
    }
  }
}
</script>

<style lang="css" scoped>
::placeholder {
  color: #DBDBDB;
}

#header {
  max-width: 100%;
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
