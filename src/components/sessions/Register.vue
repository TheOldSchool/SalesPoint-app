<template lang="html">
  <div class="container" id="register">
    <!-- Formulario Registro de usuarios !-->
    <form v-on:submit.prevent="build_user($event)">
      <div class="form-row">
        <div class="form-group col-lg-12">
          <label for="username">
            Nombre completo
            <span id="req_username" class="badge badge-danger"> Requerido*</span>
          </label>
          <input type="text" name="username" id="username"
                 class="form-control" placeholder="Alberto Ramirez Valenzuela" v-model="username"
                 @blur="outBlur($event, 'req_username')" @keyup="validator.onlyLetter($event)" required>
        </div>
        <div class="form-group col-md-6">
          <label for="email">
            Correo electronico
            <span id="req_email" class="badge badge-danger"> Requerido*</span>
          </label>
          <input type="email" name="email" id="email"
                 class="form-control" placeholder="example@hotmail.com" 
                 v-model="email_addr" @blur="outBlur($event, 'req_email')"  required>
        </div>
        <div class="form-group col-md-6">
          <label for="pass">
            Contraseña
            <span id="req_pass" class="badge badge-danger"> Requerido*</span>
            <span v-if="pass_error" class="badge badge-danger">Formato Incorrecto*</span>
          </label>

          <input type="password" name="pass" id="pass"
                 class="form-control" placeholder="********" v-model="pass_word" 
                 @blur="outBlur($event, 'req_pass')" @keyup="validate_pass" required>
          <small>Debe tener de 8-16 caracteres, al menos un dígito, una minúscula y mayúscula.</small>
        </div>
        <div class="form-group col-md-6">
          <label for="company">
            Nombre de empresa
            <span id="req_company" class="badge badge-danger"> Requerido*</span>
          </label>
          <input type="text" name="company" id="company"
                 class="form-control" placeholder="Tomatos express" v-model="company" 
                 @blur="outBlur($event, 'req_company')" required>
        </div>
        <div class="form-group col-md-6">
          <label for="regime">Régimen Fiscal</label>
          <select name="regime" id="regime" class="form-control">
            <option value="p_physical">Persona Fisica</option>
            <option value="p_moral">Persona Moral</option>
          </select>
        </div>
        <div class="form-group col-lg-12">
          <label for="rfc">
            RFC
            <span id="req_rfc" class="badge badge-danger"> Requerido*</span>
            <span class="badge badge-danger"> Formato Incorrecto*</span>
          </label>

          <input type="text" name="rfc" id="rfc"
                 class="form-control" placeholder="VECJ880326XXX" 
                 v-model="rfc" @blur="outBlur($event, 'req_rfc')"
                 @keyup="validate_rfc" required>
        </div>
        <div class="form-group col-lg-6">
          <label for="address">
            Direccion
            <span id="req_dir" class="badge badge-danger"> Requerido*</span>
          </label>
          <input type="text" name="address" id="address"
                 class="form-control" placeholder="Calle Ejemplo, No. Ejemplo" v-model="address" 
                 @blur="outBlur($event, 'req_dir')" required>
        </div>
        <div class="form-group col-lg-3">
          <label for="colony">
            Colonia
            <span id="req_colony" class="badge badge-danger"> Requerido*</span>
          </label>

          <input type="text" name="colony" id="colony"
                 class="form-control" placeholder="Colonia Ejemplo" v-model="colony" 
                 @blur="outBlur($event, 'req_colony')" required>
        </div>
        <div class="form-group col-lg-3">
          <label for="postal_code">
            Codigo Postal
            <span id="req_postal" class="badge badge-danger"> Requerido*</span>
          </label>

          <input type="number" name="postal_code" id="postal_code"
                 class="form-control" placeholder="85XXX" pattern="/^85(0-1)(0-9)/d" v-model="postal_code" 
                 @blur="outBlur($event, 'req_postal')" required>
        </div>
        <div class="form-group">
          <label for="cellphone">
            Telefono
            <span id="req_tel" class="badge badge-danger"> Requerido*</span>
            <span class="badge badge-danger"> Formato Incorrecto*</span>
          </label>

          <input type="number" name="cellphone" id="cellphone"
                 class="form-control" placeholder="6442098633" v-model="cellphone"
                 @blur="outBlur($event, 'req_tel')" @keyup="validate_phone" required>
        </div>
        <div class="form-group col-lg-12">
          <label for="terms">
            <input type="checkbox" name="terms" id="terms" v-model="terms"
              @blur=validate_terms required >
            Acepto los terminos y condiciones de uso
          </label>
        </div>
        <input class="btn market-btn" type="submit" value="Registrarme">
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
import Validator from '@/res/Validator.js';

export default {
  name: 'Register',
  data: function() {
    return {
      username: '',
      email_addr: '',
      pass_word: '',
      company: '',
      cellphone: '',
      terms: true,
      rfc: '',
      address: '',
      colony: '',
      postal_code: '',
      regime: '',
      rfc_error: true,
      phone_error: true,
      terms_error: true,
      pass_error: true,
      db_error: false,
      error_msg: '',
      validator: new Validator()
    }
  },
  methods: {
    send_user: async function(send_user) {
      let route = '/adduser';
      let response = await this.$requester.post(route, send_user.serialize());
      this.validate_response(send_user.user, response);
    },
    build_user(event) {
      let user = new User();
      user.build(event, this.company);

      if(!this.db_error){
        this.send_user(user);
      } else{
        this.db_error = true;
        this.error_msg = 'Verificar los Campos.';
      }

    },
    outBlur: function(event, id_label) {
      const label = document.getElementById(id_label);
      const input = event.target;

      if(input.value.length === 0)
        label.style.display = 'inline-block';
      else
        label.style.display = 'none';
    },
    validate_phone: function(){
      this.setValidate(this.validator.validPhone(this.cellphone));
    },
    validate_terms: function (){
      this.setValidate(this.validator.validTerms(this.terms));
    },
    validate_rfc: function (){
      var cod = document.getElementById("regime").value;
      var comp = cod.localeCompare('p_physical');
      const res = this.validator.validRFC(this.rfc, comp);
      this.setValidate(res);
    },
    validate_pass: function (){
      this.setValidate(this.validator.validPass(this.pass_word));
    },
    validate_response: function(user, acuse) {
      if(acuse.length == 0) {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.$router.push('/market');
      } else {
        this.db_error = true;
        this.error_msg = 'Ya existe un usuario con la misma empresa y/o correo electrónico';
      }
    },
    setValidate: function(response) {
      if(response.length > 0) {
        this.db_error = true;
        this.error_msg = response;
      } else
        this.db_error = false;
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
label {
  display: block;
} span {
  display: none;
}
</style>
