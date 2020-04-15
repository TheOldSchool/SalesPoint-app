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
            <label for="regime">Régimen Fiscal</label>
            <select name="regime" id="regime" class="form-control" v-model="user.company_turn">
              <option value="p_physical">Persona Fisica</option>
              <option value="p_moral">Persona Moral</option>
            </select>
          </div>
        </div>
      </div>
      <input type="submit" class="btn btn-primary btn-block" value="Cambiar">
    </form>

    <div class="alert" :class="{ 'alert-primary': okay, 'alert-danger': !okay }" role="alert" 
      v-show="alert_show" @click="alert_show = false">
      {{ message_alert }}
    </div>
  </div>
</template>

<script>
import Validator from '@/res/Validator.js';

export default {
  name: 'Profile',
  data: function() {
    return {
      okay: true,
      alert_show: false,
      error_msg: '',
      user: this.$getter.getUser(),
      validator: new Validator()
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

      let err = this.validator.validPass(this.user.password);

      if(err.length == 0) {
        err = this.validator.validPhone(this.user.cellphone);
        if(err.length == 0) {
          var cod = document.getElementById("regime").value;
          var comp = cod.localeCompare('p_physical');
          err  = this.validator.validRFC(this.user.rfc, comp);

          const response = await this.$requester.post(route, params);
          this.validate_response(response);
        }
      }

      this.validate_msg(err);
    },
    validate_response: function(response) {
      if(response.length == 0) {
        this.okay = true;
        this.alert_show = true;
        this.message_alert = 'Los datos se han agregado exitosamente';
        this.$getter.setUser(this.user);
        this.clean();
      } else {
        this.okay = false;
        this.alert_show = true;
        this.message_alert = 'Esto es penoso, por alguna razón no se pudo concretar la operación. Intentalo más tarde.';
      }
    },
    validate_msg: function(response) {
      if(response.length != 0){
        this.okay = false;
        this.alert_show = true;
        this.message_alert = response;
      }
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

.alert {
  position: fixed;
  bottom: 0;
  width: 70%;
  margin-left: 50%;
  left: -28%;
  margin-bottom: 50px;
}

</style>
