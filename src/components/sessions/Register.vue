<template lang="html">
  <div class="container" id="register">
    <form v-on:submit.prevent="build_user($event)">
      <div class="form-row">
        <div class="form-group col-lg-12">
          <label for="username">Nombre de usuario</label>
          <input type="text" name="username" id="username"
                 class="form-control" placeholder="Username" required>
        </div>
        <div class="form-group col-md-6">
          <label for="email_addr">Correo electronico</label>
          <input type="email" name="email_addr" id="email_addr"
                 class="form-control" placeholder="example@hotmail.com" required>
        </div>
        <div class="form-group col-md-6">
          <label for="pass_word">Contraseña</label>
          <input type="password" name="pass_word" id="pass_word"
                 class="form-control" placeholder="********" required>
          <small>Espacios son tomados en cuenta.</small>
        </div>
        <div class="form-group col-lg-12">
          <label for="company">Nombre de empresa</label>
          <input type="text" name="company" id="company"
                 class="form-control" placeholder="Tomatos express" required>
        </div>
        <div class="form-group col-md-6">
          <label for="cellphone">Telefono</label>
          <input type="number" name="cellphone" id="cellphone"
                 class="form-control" placeholder="6442098633" required>
        </div>
        <div class="form-group col-md-6">
          <label for="gender">Genero</label>
          <select name="gender" id="gender" class="form-control">
            <option value="man">Hombre</option>
            <option value="woman">Mujer</option>
          </select>
        </div>
        <div class="form-group col-lg-12">
          <label for="terms">
            <input type="checkbox" name="terms" id="terms">
            Acepto los terminos y condiciones de uso
          </label>
        </div>
        <input type="submit" id="snd-reg" value="Registrarme" class="btn market-btn">
      </div>
    </form>

    <div class="alert alert-danger" v-show="db_error" role="alert" 
         v-on:click="db_error = false">
      {{error_msg}}
    </div>
  </div>
</template>

<script>
import User from "@/res/User.js";
export default {
  name: 'Register',
  data: function() {
    return {
      db_error: false,
      error_msg: ''
    }
  },
  methods: {
    send_user: async function(send_user) {
      let url = 'http://localhost:3000/api/add_user';
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
    build_user(event) {
      let username = event.target.username.value;
      let email = event.target.email_addr.value;
      let pass = event.target.pass_word.value;
      let company = event.target.company.value;
      let cellphone = event.target.cellphone.value;
      let gender = event.target.gender.value;
      let terms = event.target.terms.checked;

      let user = new User(email, pass);
      user.setUsername(username);
      user.setCompany(company);
      user.setCellphone(cellphone);
      user.setGender(gender);

      if(cellphone.length == 10 && cellphone > 0)
        if(terms)
          this.send_user(user);
        else {
          this.error_msg = 'Debe aceptar los terminos y condiciones de uso.';
          this.db_error = true;
        }
      else {
        this.error_msg = 'El numero celular debe tener 10 digitos y ser numeros positivos';
        this.db_error = true;
      }
    },
    validate_response: function(acuse) {
      if(acuse.body.stats === 200) {
        this.$emit('header_panel');
        this.$router.push({name: 'market'});
      } else {
        this.db_error = true;
        this.error_msg = 'Ya existe un usuario con la misma empresa';
      }
    }
  }
}
</script>

<style lang="css" scoped>
#register {
  padding-bottom: 80px;
}

.alert {
  position: fixed;
  width: 60%;
  left: -40%;
  bottom: 0;
  margin-left: 60%;
  margin-bottom: 50px;
}
</style>
