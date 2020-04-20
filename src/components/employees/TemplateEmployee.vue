<template>
  <div class="container" id="setting-employee">
    <table>
      <tr>
        <td><img src="https://image.flaticon.com/icons/svg/554/554846.svg" 
          alt="employee" width="40px"></td>
        <td class="align-middle"><h5><b>Empleados</b></h5></td>
      </tr>
    </table>

    <!-- Formulario de alta de empleados !-->
    <form id="employee_form" @submit.prevent="add_or_update">
      <div class="form-row">
        <div class="form-group col-lg-12">
          <label for="photo">Foto de perfil</label>
          <input id="photo" class="form-control-file" type="file" name="photo"
            v-if="employee == undefined" required>
          <div v-else>
            <img :src="employee.photo" alt="perfil" width="20%" class="rounded">
          </div>
        </div>
        <div class="form-group col-md-6">
          <label for="name">Nombre</label>
          <input name="name" id="name" class="form-control" type="text" placeholder="Juan Alberto" required>
        </div>
        <div class="form-group col-md-6">
          <label for="last">Apellido</label>
          <input name="last" id="last" class="form-control" type="text" placeholder="Ozuna Gastelum" required>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label for="email_addr">Correo electrónico</label>
          <input name="email" id="email" type="text" class="form-control" placeholder="ejemplo@hotmail.com"
            required>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="gender">Sexo</label>
          <select id="gender" name="gender" class="form-control" required>
            <option value="0">Hombre</option>
            <option value="1">Mujer</option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <label for="type">Cargo</label>
          <select id="position" name="position" class="form-control" required>
            <option value="mesero">Mesero</option>
            <option value="cocinero">Cocinero</option>
            <option value="cajero">Cajero</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label for="cellphone">Número celular</label>
          <input id="cellphone" type="number" name="cellphone" class="form-control" placeholder="6442340198" required>
        </div>
      </div>

      <input class="btn btn-block btn-primary" type="submit" id="add-employee" :value="(employee != null) ? 'Guardar' : 'Agregar'">

      <div class="alert" :class="{ 'alert-primary': okay, 'alert-danger': !okay }" role="alert" 
        v-show="alert_show" @click="alert_show = false">
        {{ message_alert }}
      </div>
    </form>
  </div>
</template>

<script>
import Employee from '@/res/Employee.js';
import Validator from '@/res/Validator.js';

export default {
  name: 'TemplateEmployee',
  data: function() {
    return {
      okay: true,
      alert_show: false,
      message_alert: '',
      validator: new Validator()
    }
  },
  props: ['employee'],
  methods: {
    make_request: async function(route, data) {
      // postFile es un request que manda info y archivos como imagenes
      let response = [];

      if(this.employee == undefined)
        response = await this.$requester.postFile(route, data);
      else
        response = await this.$requester.post(route, data);

      this.validate_response(response);
    },
    add_or_update: function(event) {
      if(this.employee != undefined)
        this.update(event);
      else
        this.build_employee(event);
    },
    build_employee: function(event) {
      const route = '/addemployee';
      // Cuando se inicia sesion se guarda un objeto usuario y se obtiene con $store
      const user = this.$getter.getUser();
      let employee = new Employee(user.company);
      // Para generar la info del empleado apartir del form se usa el build y se manda un event
      employee.build(event);
      const err = this.validator.validPhone(employee.employee.cellphone);

      if(err.length == 0) {
        // Para enviar un archivo al server se hace enviando un objeto FormData
        let formData = new FormData();
        // Si es una img siempre es img del lado izquierdo
        formData.append('img', event.target.photo.files[0]);
        // Si es un FormData la info se tiene que pasar a un JSON desde el serialize
        formData.append('employee', JSON.stringify(employee.serialize()));
        this.make_request(route, formData);
      }

      this.validate_msg(err);
    },
    update: function(event) {
      const route = '/updemployee';
      const user = this.$getter.getUser();
      const employee = new Employee(user.company);
      employee.build(event);
      this.make_request(route, employee.serialize());
    },
    clean: function() {
      document.getElementById('name').value = '';
      document.getElementById('last').value = '';
      document.getElementById('email').value = '';
      document.getElementById('gender').value = 0;
      document.getElementById('position').value = 0;
      document.getElementById('cellphone').value = '';
    },
    set_employee: function() {
      const names = this.employee.name.split(' ');
      let name = '';
      let last = '';

      if(names.length == 3) {
        name = names[0];
        last = names[1] + ' ' + names[2];
      } else {
        name = names[0] + ' ' + names[1];
        last = names[2] + ' ' + names[3];
      }

      document.getElementById('name').value = name;
      document.getElementById('last').value = last;
      document.getElementById('email').value = this.employee.email;
      document.getElementById('gender').value = this.employee.gender;
      document.getElementById('position').value = this.employee.position;
      document.getElementById('cellphone').value = this.employee.cellphone;
      this.employee.name = name;
      this.employee.last = last;
    },
    validate_response: function(response) {
      if(response.length == 0) {
        this.okay = true;
        this.alert_show = true;
        this.message_alert = 'Los datos se han agregado exitosamente';
        this.clean();
      } else {
        this.okay = false;
        this.alert_show = true;
        this.message_alert = 'Esto es penoso, por alguna razón no se pudo agregar a este empleado. Intentalo más tarde.';
      }
    },
    validate_msg: function(response) {
      if(response.length != 0){
        this.okay = false;
        this.alert_show = true;
        this.message_alert = response;
      }
    }
  },
  watch: {
    employee: function() {
      if(this.employee != undefined)
        this.set_employee();
    }
  },
  mounted: function() {
    this.clean();
      if(this.employee != undefined)
        this.set_employee();
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

.alert {
  position: fixed;
  bottom: 0;
  width: 70%;
  margin-left: 50%;
  left: -28%;
  margin-bottom: 50px;
}

</style>
