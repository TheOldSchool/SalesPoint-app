<template>
  <div class="container" id="setting-products">
    <div class="container" v-show="!edit_product_menu">
      <h4><b>Productos</b></h4>
      <small><i>**Solo productos a la venta, no ingredientes**</i></small>
    </div>

    <TemplateProduct v-if="edit_product_menu" />
    <ListMenu @edit="$emit('edit_mode', 'true')" :edit_page="true" v-else />
  </div>
</template>

<script>
import TemplateProduct from "@/components/products/TemplateProduct.vue";
import ListMenu from '@/components/menus/ListMenu.vue'

export default {
  name: 'SettingProducts',
  data: function() {
    return {
      
    }
  },
  props: ['edit_product_menu'],
  components: {
    TemplateProduct,
    ListMenu
  },
  method: {
    
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
