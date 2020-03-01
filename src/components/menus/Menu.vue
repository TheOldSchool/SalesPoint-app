<template lang="html">
  <div id="menu-box" class="container">
    <router-link id="settings" class="btn" to="/settings">
      <img src="https://image.flaticon.com/icons/svg/1242/1242392.svg"
           width="20px">
      Opciones
    </router-link>

    <h6 class="text-info">Platos principales</h6>
    <ul class="list-group list-group-flush">
      <li class="list-group-item list-group-item-action">
        <button class="btn-action">
          <img src="https://image.flaticon.com/icons/svg/1046/1046857.svg"
               width="30px">
         Todos
        </button>
      </li>
      <li class="list-group-item list-group-item-action">
        <button class="btn-action" @click="getCategory('0')">
          <img src="https://image.flaticon.com/icons/svg/2366/2366518.svg"
               width="30px">
          Desayunos
        </button>
      </li>
      <li class="list-group-item list-group-item-action">
        <button class="btn-action">
          <img src="https://image.flaticon.com/icons/svg/701/701980.svg"
               width="30px">
          Comidas
        </button>
      </li>
      <li class="list-group-item list-group-item-action">
        <button class="btn-action">
          <img src="https://image.flaticon.com/icons/svg/1209/1209400.svg"
               width="30px">
          Cenas
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    getCategory: async function(category) {
      console.log('Holiiii');
      const URL = 'http://localhost:3000/api/getproducts';
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
      console.log(json);
    },
    buildProduct: function(category) {
      let user_company = '';

      if(localStorage.getItem('company') === undefined) {
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
