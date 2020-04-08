<template>
  <div id="inventory" class="container">
    <h4><b>Inventario</b></h4>

    <TemplateInventory @refresh="refresh = true" />
    <ListInventory :refresh="refresh" @not_refresh="refresh = false" />
  </div>
</template>

<script>
import TemplateInventory from '@/components/inventory/TemplateInventory.vue';
import ListInventory from '@/components/inventory/ListInventory.vue';

export default {
  name: 'SettingInventory',
  data: function() {
    return {
      refresh: false
    }
  },
  components: {
    TemplateInventory,
    ListInventory
  }
}
</script>

<style scoped>

</style>
