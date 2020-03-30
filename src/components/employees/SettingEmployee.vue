<template>
  <div id="setting-employee" class="container">
    <div class="container" v-show="!edit_employee_menu">
      <h4><b>Empleados</b></h4>
      <small><i>**Solo empleados de la empresa, administradores estan en "perfil"**</i></small>
    </div>

    <!-- Las SettingAlgo constan de un Template o Formulario y un List donde se muestran
      todos los de su categoria en este caso empleados !-->
    <TemplateEmployee v-if="edit_employee_menu" />
    <ListEmployee @edit="$emit('edit_mode', 'true')" :edit_page="true"
      :delete_access="true" v-else />
  </div>
</template>

<script>
import TemplateEmployee from '@/components/employees/TemplateEmployee.vue';
import ListEmployee from '@/components/menus/ListMenuEmployees.vue';

export default {
  name: 'SettingEmployee',
  data: function() {
    return { }
  },
  props: ['edit_employee_menu'],
  components: {
    TemplateEmployee,
    ListEmployee
  }
}
</script>

<style scoped>

</style>
