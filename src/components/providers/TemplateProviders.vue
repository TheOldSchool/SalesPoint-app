<template>
  <div class="container template_providers">
    <!-- Formulario de altas de proveedores !-->
    <table>
      <tr>
        <td><img src="../../assets/icons/providers.svg"
          alt="providers" width="40px"></td>
        <td class="align-middle"><h5><b>Proveedores</b></h5></td>
      </tr>
    </table>

    <form id="provider_form" @submit.prevent="add_or_update">
      <div class="form-group">
        <label for="logo">Logo de empresa</label>
        <input id="logo" class="form-control-file" type="file" name="logo"
          v-if="provider == undefined" required>
        <div v-else>
          <img :src="provider.photo" alt="perfil" width="20%" class="rounded">
        </div>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-md-6">
            <label for="company">Empresa</label>
            <input type="text" id="company" name="company" class="form-control"
              placeholder="SalesPoint" required>
          </div>
          <div class="col-md-6">
            <label for="contact">Contacto</label>
            <input type="text" id="contact" name="contact" class="form-control"
              placeholder="Pedro Quintero" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="address">Dirección</label>
        <input type="text" id="address" name="address" class="form-control"
          placeholder="Isla Vermudas #333 entre Isla Huivulai e Isla Tiburón" required>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-md-6">
            <label for="email">Correo electrónico</label>
            <input class="form-control" type="email" id="email" name="email"
              placeholder="ejemplo@hotmail.com" required>
          </div>
          <div class="col-md-6">
            <label for="tel">Teléfono</label>
            <input class="form-control" type="tel" id="tel" name="tel"
              placeholder="6443568799" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-md-6">
            <label for="rfc">RFC</label>
            <input class="form-control" type="text" id="rfc" name="rfc"
              placeholder="VECJ880326XXX" required>
          </div>
          <div class="col-md-6">
            <label for="regime">Régimen Fiscal</label>
            <select name="regime" id="regime" class="form-control" v-if="provider == undefined" required>
            <option value="p_physical">Persona Fisica</option>
              <option value="p_moral">Persona Moral</option>
            </select>

            <select name="regime" id="regime" class="form-control" disabled v-else>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="codepostal">Código Postal</label>
        <input class="form-control" type="number" id="codepostal" name="codepostal"
          placeholder="85219" required>
      </div>

      <input class="btn btn-block btn-primary" type="submit" value="Agregar">

      <div class="alert" :class="{ 'alert-primary': okay, 'alert-danger': !okay }" role="alert"
        v-show="alert_show" @click="alert_show = false">
        {{ message_alert }}
      </div>
    </form>

  </div>
</template>

<script>
import Provider from '@/res/Provider.js';
import Validator from '@/res/Validator.js';

export default {
  name: 'TemplateProviders',
  data: function() {
    return {
      okay: true,
      alert_show: false,
      message_alert: '',
      validator: new Validator()
    }
  },
  props:['provider'],
  methods: {
    add_or_update: function(event) {
      if(this.provider == undefined)
        this.add_provider(event);
      else
        this.update(event);
    },
    add_provider: async function(event) {
      const route = '/addprovider';

      const provider = new Provider(this.$getter);
      provider.build(event);
      let err = this.validator.validPhone(provider.provider.tel);

      if(err.length == 0) {
          var cod = document.getElementById("regime").value;
          var comp = cod.localeCompare('p_physical');
          err = this.validator.validRFC(provider.provider.rfc, comp);

          if(err.length == 0) {
            // Para mandar una imagen es con los FormData
            let formData = new FormData();
            formData.append('provider', JSON.stringify(provider.serialize().provider));
            formData.append('img', event.target.logo.files[0]);
            // Mandar imagenes con postFile
            const response = await this.$requester.postFile(route, formData);
            this.validate_response(response);
        }
      }

      this.validate_msg(err);
    },
    update: async function(event) {
      const route = '/updprovider';
      const provider = new Provider(this.$getter);
      provider.copy(this.provider);
      provider.build(event);
      const response = await this.$requester.post(route, provider.serialize());
      this.validate_response(response);
    },
    setProvider: function() {
      const ids = ['company', 'contact', 'address', 'email', 'tel', 'rfc', 'regime', 'codepostal'];
      const fields = ['name', 'contact', 'address', 'email', 'tel', 'rfc', '', 'codepostal'];
      for(let i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).value = this.provider[fields[i]];
    },
    clean: function() {
      const ids = ['company', 'contact', 'address', 'email', 'tel', 'rfc', 'regime', 'codepostal'];
      for(let i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).value = '';
    },
    validate_response: function(response) {
      if(response.length == 0) {
        this.okay = true;
        this.alert_show = true;
        this.message_alert = 'Los datos se han agregado exitosamente';
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
  },
  mounted: function() {
    this.clean();
    if(this.provider != undefined)
      this.setProvider();
  }
}
</script>

<style scoped>
table {
  margin: 40px 0px;
} h5 {
  padding: 0px 15px;
}

form {
  margin: 40px 0px;
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
