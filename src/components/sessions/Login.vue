<template lang="html">
  <div class="container" id="log-in">
    <form v-on:submit.prevent="build_user($event)">
      <div class="form-group">
        <label for="email_addr">Correo electronico</label>
        <input type="email" class="form-control" name="email_addr" id="email_addr"
               aria-describedby="emailHelp" placeholder="example@hotmail.com" required>
      </div>
      <div class="form-group">
        <label for="pass_word">Contraseña</label>
        <input type="password" class="form-control" name="pass_word" id="pass-word"
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
      remember_me: false
    }
  },
  methods: {
    send_user: async function(send_user) {
      let url = 'http://localhost:3000/api/get_user';
      let data = {user: send_user};

      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      let response = await fetch(url, options);
      let json = await response.json();
      this.validate_response(json);
    },
    build_user: function(event) {
      let email = event.target.email_addr.value;
      let pass = event.target.pass_word.value;
      this.remember_me = event.target.active_session.checked;
      let user = new User(email, pass);
      this.send_user(user);
    },
    validate_response: function(acuse) {
      if(acuse.body.stats === 200) {
        if(this.remember_me) {
          localStorage.setItem('company', acuse.body.response[0].company);
        } else {
          sessionStorage.setItem('company', acuse.body.response[0].company);
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
