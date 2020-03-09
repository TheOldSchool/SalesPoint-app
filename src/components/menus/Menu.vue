<template lang="html">
  <div id="menu-box" class="container">
    <router-link id="settings" class="btn" to="/settings">
      <img src="https://image.flaticon.com/icons/svg/1242/1242392.svg"
           width="20px">
      Opciones
    </router-link>

    <h6 class="text-info">Platos principales</h6>
    <ul class="list-group list-group-flush">
      <li class="list-group-item list-group-item-action" v-for="product in menu" v-bind:key="product.name">
        <button class="btn-action" @click="getCategory(product.value)">
          <img :src="product.url"
               width="30px">
         {{product.name}}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data: function() {
    return {
      menu: [
        {name: 'Todos', url:'https://image.flaticon.com/icons/svg/1046/1046857.svg', value: 99},
        {name: 'Desayunos', url:'https://image.flaticon.com/icons/svg/2366/2366518.svg', value: 0},
        {name: 'Entradas', url:'https://image.flaticon.com/icons/svg/751/751621.svg', value: 1},
        {name: 'Platos p.', url:'https://image.flaticon.com/icons/svg/751/751602.svg', value: 2},
        {name: 'Cena', url:'https://image.flaticon.com/icons/svg/649/649273.svg', value: 3},
        {name: 'Postres', url:'https://image.flaticon.com/icons/svg/918/918234.svg', value: 4},
        {name: 'Bebidas', url:'https://image.flaticon.com/icons/svg/600/600429.svg', value: 5},
      ]
    }
  },
  methods: {
    getCategory: async function(category) {
      const URL = (category == 99) ? 'http://localhost:3000/api/get_all_product' : 'http://localhost:3000/api/getproducts';
      let config = {
        method: 'POST',
        body: JSON.stringify({
          product: this.buildProduct(category)
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      let response = await fetch(URL, config);
      let json = await response.json();
      this.$emit('changeMenu', json.body.response);
    },
    buildProduct: function(category) {
      let user_company = '';

      if(localStorage.getItem('company') == undefined) {
        user_company = sessionStorage.getItem('company');
      } else {
        user_company = localStorage.getItem('company');
      }

      return {
        company: user_company,
        category: category
      };
    }
  }
}
</script>

<style lang="css" scoped>
#settings {
  position: fixed;
  bottom: 0;
  padding: 20px;
} #settings img {
  margin: 0px 10px;
}

button img {
  float: left;
}

.btn-action {
  border: none;
  background-color: transparent;
} .btn-action img {
  padding-right: 10px;
}
</style>
