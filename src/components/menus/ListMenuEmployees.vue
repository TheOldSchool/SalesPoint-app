<template>
  <div id="listemployee" class="container">
    <div class="row">
      <div class="col-sm-3" v-if="edit_page">
        <div>
          <Employee @edit="emit_edit" :employee="add_employee" :img="'icons/add.svg'" 
                   :edit_access="true" :delete_access="false" />
        </div>
      </div>
      <div class="col-sm-3" v-for="employee in list_employees" :key="employee.email">
        <div>
          <Employee :employee="employee" :img="'icons/laptop.svg'" :edit_access="false"
            :delete_access="delete_access" @deleted="deleted_employee" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Employee from '@/components/employees/Employee.vue';
import Requester from '@/res/Requester.js';

export default {
  name: 'ListEmployee',
  data: function() {
    return {
      list_employees: [],
      add_employee: {
          name: 'Agregar',
          email: 'Agregar',
          cellphone: 'Agregar',
          gender: 'Agregar',
          position: 'Agregar'
      },
      edit_page: true,
      requester: new Requester()
    }
  },
  props: ['delete_access'],
  components: {
    Employee
  },
  methods: {
    emit_edit: function() {
      this.$emit('edit', true);
    },
    deleted_employee: function(state) {
      console.log(state);
      if(state)
        this.make_request();
    },
    make_request: async function() {
      const route = '/getallemployees';
      const user = this.$store.getters.getUser;

      const employee = {
        employee: {
          type: 'employee',
          template: { company: user.company }
        }
      };

      let response = await this.requester.post(route, employee);
      this.list_employees = response;
      console.log(this.list_employees);
    }
  },
  created: async function() {
    await this.make_request();
  }
}
</script>

<style scoped>
#listemployee {
  height: 100vh;
  padding-top: 40px;
  text-align: center;
  background-color: #fff;
}
</style>
