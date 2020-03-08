<template>
  <div id="list-menu" class="container">
    <div class="row">
      <div class="col-sm-3" v-if="edit_page">
        <div>
          <Product @edit="emit_edit" :product="add_product" :img="'icons/add.svg'" 
                   :edit_access="true" />
        </div>
      </div>
      <div class="col-sm-3" v-for="product in list_products" :key="product.key">
        <div> 
          <Product :product="product" :img="'icons/laptop.svg'" :edit_access="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/products/Product.vue';

export default {
  name: 'ListMenu',
  data: function() {
    return {
      list_products: null,
      add_product: {
        key: 'ADD',
        name: '',
        desc: 'Agrega un nuevo producto',
        price: 'Agregar'
      }
    }
  },
  props: ['menu', 'edit_page'],
  components: {
    Product
  },
  methods: {
    emit_edit: function() {
      this.$emit('edit', true);
    }
  },
  watch: {
    menu: function() {
      this.list_products = this.menu;
    }
  },
  beforeCreate: async function() {
    const URL = 'http://localhost:3000/api/get_all_product';
    let user_company = '';

    if(localStorage.getItem('company') == undefined) {
      user_company = sessionStorage.getItem('company');
    } else {
      user_company = localStorage.getItem('company');
    }

    const options = {
      method: 'POST',
      body: JSON.stringify({product: {company: user_company}}),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    let response = await fetch(URL, options);
    let json = await response.json();
    this.list_products = json.body.response;
  }
}
</script>

<style scoped>
#list-menu {
  height: 100vh;
  padding-top: 40px;
  text-align: center;
  background-color: #fff;
}
</style>
