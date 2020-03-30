<template>
  <div id="employee" class="container employee-card">
    <button class="btn card-button" @click="try_emit()"
      @mouseover="hover = true" @mouseleave="hover = false">

      <!-- Se genera un pequeño cuadro con la info del empleado !-->
      <div class="col-lg-12 text-center">
        <img id="icon" :src="require(`@/assets/${img}`)" alt="icon" width="80%"
          v-if="edit_access" >
        <img id="icon" :src="employee.photo" alt="icon" width="80%" v-else>
      </div>
      <div class="col-lg-12">
        <h6><b :class="{ card_hover_text: hover, opacity: edit_access }">{{employee.name}}</b></h6>
      </div>
      <div class="col-lg-12">
        <h6 :class="{ opacity: edit_access }">{{employee.email}}</h6>
        <h6 :class="{ opacity: edit_access }">{{employee.cellphone}}</h6>
      </div>

      <div class="col-lg-12">
        <span>
          <b :class="{ card_hover_text: hover, opacity: edit_access }">
            {{employee.position.charAt(0).toUpperCase() + employee.position.slice(1)}}
          </b>
        </span>
      </div>

      <div class="btn-group" role="group" v-if="edit_access">
        <button class="btn btn-outline-success">
          Agregar
        </button>
      </div>

    </button>

    <div class="btn-group" role="group" v-if="!edit_access">
      <button class="btn btn-outline-danger" @click="delete_employee(employee.email)" >
        Eliminar
      </button>
    </div>

  </div>
</template>

<script>
import Requester from '@/res/Requester.js';

export default {
  name: 'Employee',
  data: function() {
    return {
      hover: false,
      requester: new Requester()
    }
  },
  props: ['employee', 'img', 'edit_access'],
  methods: {
    // Se usa solo en el cuadro de agregar, para abrir formulario
    try_emit: function() {
      if(this.edit_access)
        this.$emit('edit', true);
    },
    delete_employee: async function(email) {
      if(confirm('¿Desear eliminar este empleado?')) {
        // route es la ruta del server a la que ir
        const route = '/delemployee';
        // Se genera un objecto que el server pueda leer
        // Con type y template donde template es la info del objeto
        const employee = {
          employee: {
            type: 'employee',
            template: { email: email }
          }
        };

        // Requester es una clase con lo necesario para hacer un request
        const response = await this.requester.post(route, employee);

        // El server regresa un array y si es [] es que se elimino
        if(response.length == 0)
          this.$emit('deleted', true);
        else
          this.$emit('deleted', false);
      }

    }
  }
}
</script>

<style scoped>
.employee-card {
  height: 320px;
  margin: 10px auto;
  border-radius: 5px;
  border: 1px solid rgba(0,0,0,0.15);
  transition: ease-in 100ms;
} .employee-card:hover {
  border: 1px solid rgba(0,0,0,0.45);
}

.card_hover_text {
  color: var(--dark-green);
}

.opacity {
  opacity: 0;
}

.employee-card button {
  width: 100%;
} .employee-card img {
  padding: 8px;
  border-radius: 10px;
} h6 {
  padding: 2px 0px;
}

.btn-group {
  width: 100%;
}
</style>
