<template>
  <div class="container setting_providers">

  <!-- Las SettingAlgo constan de un Template o Formulario y un List donde se muestran
      todos los de su categoria en este caso productos !-->
  <!-- TODO: Listado de proveedores !-->

    <TemplateProviders></TemplateProviders>
  </div>
</template>

<script>
import TemplateProviders from '@/components/providers/TemplateProviders.vue';

export default {
  name: 'SettingProviders',
  components: {
    TemplateProviders
  }
}
</script>

<style scoped>

</style>
