<template>
  <div class="container setting_providers">
    <div class="container" v-show="!edit_menu">
      <h4><b>Proveedores</b></h4>
      <small><i>**Solo información sobre proveedores, para compras o registros consultar "Compras"
        o "Historial" **</i></small>
    </div>

  <!-- Las SettingAlgo constan de un Template o Formulario y un List donde se muestran
      todos los de su categoria en este caso productos !-->
  <!-- TODO: Listado de proveedores !-->

    <TemplateProviders v-if="edit_menu" :provider="provider" />
    <ListMenuProviders :delete_access="true" @edit="edit"
      @update="update" v-else />
  </div>
</template>

<script>
import TemplateProviders from '@/components/providers/TemplateProviders.vue';
import ListMenuProviders from '@/components/menus/ListMenuProviders.vue';

export default {
  name: 'SettingProviders',
  data: function() {
    return {
      provider: null
    }
  },
  components: {
    TemplateProviders,
    ListMenuProviders
  },
  props: ['edit_menu'],
  methods: {
    update: function(provider) {
      this.provider = provider;
      this.emiting();
    },
    edit: function() {
      this.provider = null;
      this.emiting();
    },
    emiting: function() {
      this.$emit('edit_mode', true);
    }
  }
}
</script>

<style scoped>

</style>
