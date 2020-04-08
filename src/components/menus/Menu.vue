<template lang="html">
  <div id="menu-box" class="container">
    <!-- Menu de productos en el apartado de ventas como filtros de busqueda !-->
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
      // Tipos de comidas y su formato en pantalla
      menu: [
        {name: 'Todos', url:'https://image.flaticon.com/icons/svg/1046/1046857.svg', value: 99},
        {name: 'Desayunos', url:'https://image.flaticon.com/icons/svg/2366/2366518.svg', value: 0},
        {name: 'Entradas', url:'https://image.flaticon.com/icons/svg/751/751621.svg', value: 1},
        {name: 'Platos p.', url:'https://image.flaticon.com/icons/svg/751/751602.svg', value: 2},
        {name: 'Cena', url:'https://image.flaticon.com/icons/svg/649/649273.svg', value: 3},
        {name: 'Postres', url:'https://image.flaticon.com/icons/svg/918/918234.svg', value: 4},
        {name: 'Bebidas', url:'https://image.flaticon.com/icons/svg/600/600429.svg', value: 5},
      ],
    }
  },
  methods: {
    // Request de comidas de ese tipó
    getCategory: async function(category) {
      // route es la ruta a la cual ir del server
      // Si category es 99 entonces dame todos si no dame tal categoria
      const route = (category == 99) ? '/getallproduct' : '/getproducts';
      // Se obtiene el objeto user que se guardo en el login
      const user = this.$getters.getUser;
      // Se crea objeto reconocible por el server
      const product = {
        product: {
          type: 'product',
          template: {
            company: user.company,
            category: category
          }
        }
      };

      let response = await this.$requester.post(route, product);
      this.$emit('changeMenu', response);
    },
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
