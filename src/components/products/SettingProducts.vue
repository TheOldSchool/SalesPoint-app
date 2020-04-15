<template>
  <div class="container" id="setting-products">
    <div class="container" v-show="!edit_product_menu">
      <h4><b>Productos</b></h4>
      <small><i>**Solo productos a la venta, no ingredientes**</i></small>
    </div>

    <!-- Las SettingAlgo constan de un Template o Formulario y un List donde se muestran
      todos los de su categoria en este caso productos !-->
    <TemplateProduct v-if="edit_product_menu" :product="update_product" />
    <ListMenu @edit="emit_edit" :edit_page="true"
      :delete_access="true" @update="update" v-else />
  </div>
</template>

<script>
import TemplateProduct from "@/components/products/TemplateProduct.vue";
import ListMenu from '@/components/menus/ListMenu.vue'

export default {
  name: 'SettingProducts',
  data: function() {
    return {
      update_product: null,
    }
  },
  props: ['edit_product_menu'],
  components: {
    TemplateProduct,
    ListMenu
  },
  methods: {
    update: function(product) {
      this.update_product = product;
      this.$emit('edit_mode', true);
    },
    emit_edit: function() {
      this.update_product = null;
      this.$emit('edit_mode', 'true');
    }
  }
}
</script>

<style scoped>
#admin-product {
  padding-top: 20px;
} #admin-product button {
  width: 100%;
}
</style>
