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
                 @blur="outBlur($event, 'req_username')" required>
        </div>
        <div class="form-group col-md-6">
          <label for="email_addr">
            Correo electronico
            <span id="req_email" class="badge badge-danger"> Requerido*</span>
          </label>
          <input type="email" name="email_addr" id="email_addr"
                 class="form-control" placeholder="example@hotmail.com" 
                 v-model="email_addr" @blur="outBlur($event, 'req_email')"  required>
        </div>
        <div class="form-group col-md-6">
          <label for="pass_word">
            Contraseña
            <span id="req_pass" class="badge badge-danger"> Requerido*</span>
            <span v-if="pass_error" class="badge badge-danger">Formato Incorrecto*</span>
          </label>

          <input type="password" name="pass_word" id="pass_word"
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
      error_msg: ''
    }
  },
  methods: {
    send_user: async function(send_user) {
      let route = 'adduser';
      let data = {user: send_user};

      let response = await this.$requester.post(route, data);
      let json = await response.json();
      this.validate_response(json);
    },
    build_user(event) {
      let username = event.target.username.value;
      let pass = event.target.pass_word.value;
      let company = event.target.company.value;
      let company_turn = event.target.regime.value;
      let rfc = event.target.rfc.value;
      let email = event.target.email_addr.value;
      let address = event.target.address.value;
      let colony = event.target.colony.value;
      let postal_code = event.target.postal_code.value;
      let cellphone = event.target.cellphone.value;

      let user = new User(email, pass);
      user.setUsername(username);
      user.setCompany(company);
      user.setCompanyTurn(company_turn);
      user.setRFC(rfc);
      user.setAddress(address);
      user.setColony(colony);
      user.setpostalCode(postal_code);
      user.setCellphone(cellphone);

      if(!this.db_error){
        this.send_user(user);
      }
      else{
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
      if(this.cellphone.length == 10 && this.cellphone > 0)
        this.db_error = false;
      else {
        this.error_msg = 'El numero celular debe tener 10 digitos y ser numeros positivos';
        this.db_error = true;
      }
    },
    validate_terms: function (){
      if(this.terms)
        this.db_error = false;
      else {
          this.error_msg = 'Debe aceptar los terminos y condiciones de uso.';
          this.db_error = true;
      }
    },
    validate_rfc: function (){
      var cod = document.getElementById("regime").value;
      var comp = cod.localeCompare('p_physical');

      if(comp == 0){
        const re1 = /^([A-ZÑ&]{4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;

        if(this.rfc.match(re1))
          this.db_error = false;
        else{
          this.error_msg = 'El RFC debe cumplir con las condiciones establecidas dependiendo de la Persona Fisica (ABCD123456XXX).';
          this.db_error = true;
        }
      } else{
        const re2 = /^([A-ZÑ&]{3}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;

        if(this.rfc.match(re2))
          this.rfc_error=false;
        else{
          this.error_msg = 'El RFC debe cumplir con las condiciones establecidas dependiendo de la Persona Moral (ABC123456XXX).';
          this.db_error = true;
        }
      }
    },
    validate_pass: function (){
      const re3 = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

      if(this.pass_word.match(re3))
        this.db_error =false;
      else{
        this.error_msg = 'La contraseña debe cumplir los requisitos del sistema. (ver en Ayuda)';
        this.db_error = true;
      }
    },
    validate_response: function(acuse) {
      if(acuse.body.stats === 200) {
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
label {
  display: block;
} span {
  display: none;
}
</style>
