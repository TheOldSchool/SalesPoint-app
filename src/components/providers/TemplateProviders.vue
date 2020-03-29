<template>
  <div class="container template_providers">
    <h4><b>Panel de control</b></h4>

    <table>
      <tr>
        <td><img src="../../assets/icons/providers.svg"
          alt="providers" width="40px"></td>
        <td class="align-middle"><h5><b>Proveedores</b></h5></td>
      </tr>
    </table>

    <form id="provider_form" @submit.prevent="add_provider($event)">
      <div class="form-group">
        <label for="logo">Logo de empresa</label>
        <input id="logo" class="form-control-file" type="file" name="logo">
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-md-6">
            <label for="company">Empresa</label>
            <input type="text" id="company" name="company" class="form-control"
              placeholder="SalesPoint">
          </div>
          <div class="col-md-6">
            <label for="contact">Contacto</label>
            <input type="text" id="contact" name="contact" class="form-control"
              placeholder="Pedro Quintero">
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="address">Dirección</label>
        <input type="text" id="address" name="address" class="form-control"
          placeholder="Isla Vermudas #333 entre Isla Huivulai e Isla Tiburón">
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-md-6">
            <label for="email">Correo electrónico</label>
            <input class="form-control" type="email" id="email" name="email"
              placeholder="ejemplo@hotmail.com">
          </div>
          <div class="col-md-6">
            <label for="tel">Teléfono</label>
            <input class="form-control" type="tel" id="tel" name="tel"
              placeholder="6443568799">
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-md-6">
            <label for="rfc">RFC</label>
            <input class="form-control" type="text" id="rfc" name="rfc"
              placeholder="VECJ880326XXX">
          </div>
          <div class="col-md-6">
            <label for="regime">Régimen Fiscal</label>
            <select name="regime" id="regime" class="form-control">
              <option value="p_physical">Persona Fisica</option>
              <option value="p_moral">Persona Moral</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="codepostal">Código Postal</label>
        <input class="form-control" type="number" id="codepostal" name="codepostal"
          placeholder="85219">
      </div>

      <input class="btn btn-block btn-primary" type="submit" value="Agregar">
    </form>

  </div>
</template>

<script>
import Requester from '@/res/Requester.js';

export default {
  name: 'TemplateProviders',
  data: function() {
    return {
      requester: new Requester(),
    }
  },
  methods: {
    add_provider: async function(event) {
      const route = '/addprovider';
      const user = this.$store.getters.getUser;
console.log(user);
      const provider = {
        type: 'provider',
        template: {
          key: this.$store.getters.getRandomKey,
          photo: 'http://localhost:8000/',
          name: event.target.company.value,
          address: event.target.address.value,
          tel: event.target.tel.value,
          rfc: event.target.rfc.value,
          contact: event.target.contact.value,
          email: event.target.email.value,
          codepostal: event.target.codepostal.value,
          company: user.company
        }
      };

      let formData = new FormData();
      formData.append('provider', JSON.stringify(provider));
      formData.append('img', event.target.logo.files[0]);
      const response = await this.requester.postFile(route, formData);
      console.log(response);
    },

  }
}
</script>

<style scoped>
h4 {
  margin: 40px 0px;
} h5 {
  padding: 0px 15px;
}

form {
  margin: 40px 0px;
}
</style>
