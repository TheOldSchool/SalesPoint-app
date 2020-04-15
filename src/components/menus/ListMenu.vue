<template>
  <div id="list-menu" class="container">
    <!-- Se crea listado de productos !-->
    <table id="table-report" v-if="delete_access">
      <tr>
        <td><b>Reporte de productos</b></td>
        <td><button class="btn btn-success" @click="report">Generar</button></td>
      </tr>
    </table>

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
            @animation_ring="animation_ring" @update="update" />
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
      // Listado de bd que se va actualizando
      list_products: null,
      // Info para el cuadro de alta
      add_product: {
        key: 'ADD',
        name: '',
        desc: 'Agrega un nuevo producto',
        price: 'Agregar'
      },
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
    update: function(product) {
      this.$emit('update', product);
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
      const user = this.$getter.getUser();
      // Se crea objeto reconocible con el server
      const product = {
        product: {
          type: 'product',
          template: { company: user.company }
        }
      };
      let response = await this.$requester.post(route, product);
      // Se actualiza la lista de productos
      this.list_products = response;
    },
    animation_ring: function() {
      this.$emit('animation_ring');
    },
    report: function() {
      let inventory = [];
      let content = [];
      let total = 0;
      inventory.push(['Clave', 'Nombre', 'Precio', 'Descripcion', 'Categoria']);
      for(let i = 0; i < this.list_products.length; i++) {
        let category = this.getCategory(this.list_products[i].category);
        content.push([
            this.list_products[i].key,
            this.list_products[i].name,
            this.list_products[i].price,
            this.list_products[i].desc,
            category
          ]
        );
        total++;
      }
      content.push(['Total', '', '', '', total]);
      inventory.push(content);

      this.$reports.write('reporte_inventario.pdf', inventory);
    },
    getCategory: function(type) {
      switch(type) {
        case 0: return 'Desayuno';
        case 1: return 'Entrada';
        case 2: return 'Platillo principal';
        case 3: return 'Cena';
        case 4: return 'Postre';
        case 5: return 'Bebida';
      }
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

.row {
  margin-top: 30px;
}
</style>
