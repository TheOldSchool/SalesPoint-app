<template>
  <div class="container" id="setting-employee">
    <h4>Panel de control</h4>

    <table>
      <tr>
        <td><img src="https://image.flaticon.com/icons/svg/554/554846.svg" 
          alt="employee" width="40px"></td>
        <td class="align-middle"><h5>Empleados</h5></td>
      </tr>
    </table>

    <form action="">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="name">Nombre</label>
          <input class="form-control" type="text">
        </div>
        <div class="form-group col-md-6">
          <label for="last">Apellido</label>
          <input class="form-control" type="text">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label for="email-addr">Correo electrónico</label>
          <input type="text" class="form-control">
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
          <select id="type" name="type" class="form-control">
            <option value="1">Mesero</option>
            <option value="2">Cocinero</option>
            <option value="3">Cajero</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label for="cellphone">Número celular</label>
          <input id="cellphone" type="text" name="cellphone" class="form-control">
        </div>
      </div>

      <button class="btn btn-primary" type="submit" id="add-employee">
        Agregar Empleado
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TemplateEmployee'
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

#add-employee {
  width: 100%;
}
</style>
