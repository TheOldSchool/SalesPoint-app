<template>
  <div id="listemployee" class="container">
    <!-- Se crea listado de empleados !-->
    <table id="table-report" v-if="delete_access">
      <tr>
        <td><b>Reporte de empleados</b></td>
        <td><button class="btn btn-success" @click="report">Generar</button></td>
      </tr>
    </table>

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
            :delete_access="delete_access" @deleted="deleted_employee" @update="update" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Employee from '@/components/employees/Employee.vue';

export default {
  name: 'ListEmployee',
  data: function() {
    return {
      // Lista actualizable
      list_employees: [],
      // Info del cuadro agregar empleado
      add_employee: {
          name: 'Agregar',
          email: 'Agregar',
          cellphone: 'Agregar',
          gender: 'Agregar',
          position: 'Agregar'
      },
      // Saber si se debe mostrar el cuadro de agregar
      edit_page: true,
    }
  },
  // Saber si se debe mostrar el boton de eliminar
  props: ['delete_access'],
  components: {
    Employee
  },
  methods: {
    // Se avisa que se habra la ventana de agregar
    emit_edit: function() {
      this.$emit('edit', true);
    },
    update: function(employee) {
      this.$emit('update', employee);
    },
    deleted_employee: function(state) {
      // Si se elimina se manda a actualizar la lista
      if(state)
        this.make_request();
    },
    make_request: async function() {
      // route es la ruta de server a la cual ir
      const route = '/getallemployees';
      // Se obtiene el objeto user guardado al iniciar sesion
      const user = this.$getter.getUser();

      // Se crea objeto reconocible por el server
      const employee = {
        employee: {
          type: 'employee',
          template: { company: user.company }
        }
      };

      let response = await this.$requester.post(route, employee);
      this.list_employees = response;
    },
    report: function() {
      let inventory = [];
      let content = [];
      let total = 0;
      inventory.push(['Correo electronico', 'Nombre', 'Genero', 'Cargo', '# Tel.']);
      for(let i = 0; i < this.list_employees.length; i++) {
        content.push([
            this.list_employees[i].email,
            this.list_employees[i].name,
            (this.list_employees[i].gender == 0) ? 'Hombre' : 'Mujer',
            this.list_employees[i].position,
            this.list_employees[i].cellphone
          ]
        );
        total++;
      }
      content.push(['Total', '', '', '', total]);
      inventory.push(content);

      this.$reports.write('reporte_empleados.pdf', inventory);

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

.row {
  margin-top: 30px;
}
</style>
