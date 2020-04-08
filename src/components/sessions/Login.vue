<template lang="html">
  <div class="container" id="log-in">
    <!-- Formulario inicio de sesion !-->
    <form v-on:submit.prevent="send_user($event)">
      <div class="form-group">
        <label for="email_addr">Correo electronico</label>
        <input type="email" class="form-control" name="email" id="email"
               aria-describedby="emailHelp" placeholder="example@hotmail.com" required>
      </div>
      <div class="form-group">
        <label for="pass_word">Contraseña</label>
        <input type="password" class="form-control" name="pass" id="pass"
               placeholder="********" maxlength="18" required>
        <small id="pass-word-alert" class="form-text text-muted">
          Los espacios también son tomados en cuenta.
        </small>
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="active_session">
        <label class="form-check-label" for="active_session">
          Recordarme
        </label>
      </div>

      <button type="submit" class="btn market-btn">Iniciar Sesión</button>
    </form>

    <div class="alert alert-danger" v-show="db_error" role="alert" 
         v-on:click="db_error = false">
      Usuario o contraseña incorrectos
    </div>
  </div>
</template>

<script>
import User from "@/res/User.js";

export default {
  name: 'Login',
  data: function() {
    return {
      db_error: false,
      remember_me: false,
    }
  },
  methods: {
    send_user: async function(event) {
      // route es la ruta del server a la cual ir
      let route = '/getuser';
      // Se crea objeto reconocible por el server a apartir del event del form
      const user = new User();
      user.build(event, '');
      const serialize_user = user.serialize();

      const response = await this.$requester.post(route, serialize_user);
      this.validate_response(response);
    },
    validate_response: function(response) {
      // Si la info es correcta se guarda un objeto usuario
      if(response.length == 1) {
        if(this.remember_me) {
          localStorage.setItem('user', JSON.stringify(response[0]));
        } else {
          sessionStorage.setItem('user', JSON.stringify(response[0]));
        }

        this.$emit('header_panel');
        this.$router.push({name: 'market'});
      } else
        this.db_error = true;
    }
  }
}
</script>

<style lang="css" scoped>
.alert {
  position: fixed;
  width: 60%;
  left: -40%;
  bottom: 0;
  margin-left: 60%;
  margin-bottom: 50px;
}

</style>
