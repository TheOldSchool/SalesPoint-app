<template>
  <div class="container" id="menusett">
    <h6 class="text-info">Configuración</h6>
    <ul class="list-group list-group-flush">
      <li class="list-group-item list-group-item-action">
        <button class="btn-action" v-on:click="$emit('change_window', 'products')">
          <img src="../../assets/icons/pizza.svg"
               width="30px">
          Productos
        </button>
      </li>
      <li class="list-group-item list-group-item-action">
        <button class="btn-action" v-on:click="$emit('change_window', 'employees')">
          <img src="../../assets/icons/employees.svg"
               width="30px">
          Empleados
        </button>
      </li>
      <li class="list-group-item list-group-item-action">
        <button class="btn-action">
          <img src="../../assets/icons/inventory.svg"
               width="30px">
          Inventario
        </button>
      </li>
      <li class="list-group-item list-group-item-action">
        <button class="btn-action" v-on:click="$emit('change_window', 'providers')">
          <img src="../../assets/icons/providers.svg"
               width="30px">
          Proveedores
        </button>
      </li>
      <li class="list-group-item list-group-item-action">
        <button class="btn-action">
          <img src="../../assets/icons/buy.svg"
               width="30px">
          Compras
        </button>
      </li>

      <li class="list-group-item list-group-item-action">
        <button class="btn-action" v-on:click="$emit('change_window', 'historical')">
          <img src="https://image.flaticon.com/icons/svg/2289/2289352.svg"
               width="30px">
          Historial
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuSettings'
}
</script>

<style scoped>
#menusett {
  height: 100vh;
  padding-top: 20px;
  background-color: #fff;
}

button img {
  float: left;
}

.btn-action {
  border: none;
  background-color: transparent;
} .btn-action img {
  padding-right: 10px;
}
</style>
