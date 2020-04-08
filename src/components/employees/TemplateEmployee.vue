<template>
  <div class="container" id="setting-employee">
    <h4><b>Panel de control</b></h4>

    <table>
      <tr>
        <td><img src="https://image.flaticon.com/icons/svg/554/554846.svg" 
          alt="employee" width="40px"></td>
        <td class="align-middle"><h5><b>Empleados</b></h5></td>
      </tr>
    </table>

    <!-- Formulario de alta de empleados !-->
    <form id="employee_form" @submit.prevent="build_employee">
      <div class="form-row">
        <div class="form-group col-lg-12">
          <label for="photo">Foto de perfil</label>
          <input id="photo" class="form-control-file" type="file" name="photo">
        </div>
        <div class="form-group col-md-6">
          <label for="name">Nombre</label>
          <input name="name" id="name" class="form-control" type="text">
        </div>
        <div class="form-group col-md-6">
          <label for="last">Apellido</label>
          <input name="last" id="last" class="form-control" type="text">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label for="email_addr">Correo electrónico</label>
          <input name="email" id="email" type="text" class="form-control">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="gender">Sexo</label>
          <select id="gender" name="gender" class="form-control">
            <option value="0">Hombre</option>
            <option value="1">Mujer</option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <label for="type">Cargo</label>
          <select id="position" name="position" class="form-control">
            <option value="mesero">Mesero</option>
            <option value="cocinero">Cocinero</option>
            <option value="cajero">Cajero</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label for="cellphone">Número celular</label>
          <input id="cellphone" type="text" name="cellphone" class="form-control">
        </div>
      </div>

      <button class="btn btn-block btn-primary" type="submit" id="add-employee">
        Agregar Empleado
      </button>
    </form>
  </div>
</template>

<script>
import Employee from '@/res/Employee.js';

export default {
  name: 'TemplateEmployee',
  data: function() {
    return { }
  },
  methods: {
    make_request: async function(data) {
      // route es la ruta del server a la cual ir
      const route = '/addemployee';

      // postFile es un request que manda info y archivos como imagenes
      const response = await this.$requester.postFile(route, data);
      console.log(response);
    },
    build_employee: function(event) {
      // Cuando se inicia sesion se guarda un objeto usuario y se obtiene con $store
      const user = this.$store.getters.getUser;
      let employee = new Employee(user.company);
      // Para generar la info del empleado apartir del form se usa el build y se manda un event
      employee.build(event, user.company);

      // Para enviar un archivo al server se hace enviando un objeto FormData
      let formData = new FormData();
      // Si es una img siempre es img del lado izquierdo
      formData.append('img', event.target.photo.files[0]);
      // Si es un FormData la info se tiene que pasar a un JSON desde el serialize
      formData.append('employee', JSON.stringify(employee.serialize()));
      this.make_request(formData);
    }
  }
}
</script>

<style scoped>
#panel {
  text-align: right;
  margin: 40px 0px;
}

h4 {
  margin: 40px 0px;
} h5 {
  padding: 0px 15px;
}

form {
  margin: 40px 0px;
}
</style>
