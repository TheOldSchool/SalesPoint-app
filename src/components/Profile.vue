<template>
  <div id="profile" class="container">
    <table>
      <tr>
        <td><img src="https://image.flaticon.com/icons/svg/727/727399.svg"
          alt="profile" width="40px"></td>
        <td class="align-middle"><h5><b>Perfil</b></h5></td>
      </tr>
    </table>

    <form @submit.prevent="sendProfile()">

      <div class="form-group">
        <div class="row">
          <div class="col-md-6">
            <label for="name">Nombre</label>
            <input id="name" type="text" name="name" class="form-control" placeholder="Nombre"
              v-if="user.username" v-model="user.username">
            <input id="name" type="text" name="name" class="form-control" placeholder="Nombre"
              v-else v-model="user.name">
          </div>
          <div class="col-md-6">
            <label for="position">Cargo</label>
            <input id="position" type="text" name="position" class="form-control" placeholder="Camarero"
              v-if="user.position" v-model="user.position" disabled>
            <input id="position" type="text" name="position" class="form-control" placeholder="Camarero"
              v-else value="Administrador" disabled>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-md-6">
            <label for="name">Correo electrónico</label>
            <input id="email" type="email" name="email" class="form-control" placeholder="ejemplo@hotmail.com"
              v-model="user.email">
          </div>
          <div class="col-md-6">
            <label for="pass">Contraseña</label>
            <input id="pass" type="password" name="pass" class="form-control" placeholder="**********"
              v-model="user.password">
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-md-6">
            <label for="gender">Genero</label>
            <select id="gender" class="form-control" name="gender" v-model="user.gender">
              <option value="0">Hombre</option>
              <option value="1">Mujer</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="tel"># Telefónico</label>
            <input id="tel" type="tel" name="tel" class="form-control" placeholder="6442356478"
              v-model="user.cellphone">
          </div>
        </div>
      </div>

      <div class="form-group" v-if="user.address">
        <label for="address">Dirección</label>
        <input id="address" type="text" name="address" class="form-control" placeholder="Isla vermudas #333"
          v-model="user.address">
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-md-6" v-if="user.colony">
            <label for="colony">Colonia</label>
            <input id="colony" type="text" name="colony" class="form-control" placeholder="Alameda"
              v-model="user.colony">
          </div>
          <div class="col-md-6" v-if="user.postal_code">
            <label for="codepostal">Código postal</label>
            <input id="codepostal" type="text" name="codepostal" class="form-control" placeholder="85219"
              v-model="user.postal_code">
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-md-6" v-if="user.rfc">
            <label for="rfc">RFC</label>
            <input id="rfc" type="text" name="rfc" class="form-control" placeholder="VECJ880326XXX"
              v-model="user.rfc">
          </div>
          <div class="col-md-6" v-if="user.company_turn">
            <label for="turn">Regimen fiscal</label>
            <input id="turn" type="text" name="turn" class="form-control" placeholder="Persona fisica"
              v-model="user.company_turn">
          </div>
        </div>
      </div>
      <input type="submit" class="btn btn-primary btn-block" value="Cambiar">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data: function() {
    return {
      user: this.$getter.getUser()
    }
  },
  methods: {
    sendProfile: async function() {
      const route = (this.user.username) ? '/upduser' : '/updemployee';
      const params = {
        user: {
          type: (this.user.username) ? 'user' : 'employee',
          template: this.user
        }
      };

      const response = await this.$requester.post(route, params);
      if(response.length == 0)
        this.$getter.setUser(this.user);
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 40px 0px;
} h5 {
  padding: 0px 15px;
}

table {
  margin: 50px 0px;
}
</style>
