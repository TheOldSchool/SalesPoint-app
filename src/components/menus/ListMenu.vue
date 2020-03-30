<template>
  <div id="list-menu" class="container">
    <!-- Se crea listado de productos !-->
    <div class="row">
      <div class="col-sm-3" v-if="edit_page">
        <div>
          <Product @edit="emit_edit" :product="add_product" :img="'icons/add.svg'" 
                   :edit_access="true" :delete_access="delete_access" />
        </div>
      </div>
      <div class="col-sm-3" v-for="product in list_products" :key="product.key">
        <div> 
          <Product :product="product" :img="'icons/laptop.svg'" :edit_access="false" 
            :delete_access="delete_access" @deleted="deleted_product" 
            @pushing_product="send_product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/products/Product.vue';
import Requester from '@/res/Requester.js';

export default {
  name: 'ListMenu',
  data: function() {
    return {
      // Listado de bd que se va actualizando
      list_products: null,
      // Info para el cuadro de alta
      add_product: {
        key: 'ADD',
        name: '',
        desc: 'Agrega un nuevo producto',
        price: 'Agregar'
      },
      requester: new Requester()
    }
  },
  props: ['menu', 'edit_page', 'delete_access'],
  components: {
    Product
  },
  methods: {
    // Se emite un evento para pasar a la alta
    emit_edit: function() {
      this.$emit('edit', true);
    },
    deleted_product: function(state) {
      // Si se elimino un producto se manda request para lista actualizada
      if(state)
        this.make_request();
    },
    make_request: async function() {
      // route es la ruta de server a la que ir
      const route = '/getallproduct';
      // Se obtiene el objeto user guardado al iniciar sesion
      const user = this.$store.getters.getUser;
      // Se crea objeto reconocible con el server
      const product = {
        product: {
          type: 'product',
          template: { company: user.company }
        }
      };

      let response = await this.requester.post(route, product);
      // Se actualiza la lista de productos
      this.list_products = response;
    },
    send_product: function(selected_product) {
      this.$emit('pushing_product', selected_product);
    }
  },
  watch: {
    menu: function() {
      // Si el menu cambia se actualiza la lista de productos
      this.list_products = this.menu;
    }
  },
  created: function() {
    this.make_request();
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
