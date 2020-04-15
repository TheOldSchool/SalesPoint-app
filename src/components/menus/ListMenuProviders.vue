<template>
  <div id="listmenuproviders" class="container">
    <!-- Se crea listado de empleados !-->
    <table id="table-report" v-if="delete_access">
      <tr>
        <td><b>Reporte de proveedores</b></td>
        <td><button class="btn btn-success" @click="report">Generar</button></td>
      </tr>
    </table>

    <div class="row">
      <div class="col-sm-3" v-if="edit_page">
        <div>
          <Providers @edit="emit_edit" :provider="add_provider" :img="'icons/add.svg'" 
                   :edit_access="true" :delete_access="false" />
        </div>
      </div>
      <div class="col-sm-3" v-for="provider in list_providers" v-bind:key="provider.id">
        <div>
          <Providers :provider="provider" :img="'icons/laptop.svg'" :edit_access="false"
            :delete_access="delete_access" @deleted="deleted_provider" @update="update" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Providers from '@/components/providers/Providers.vue';
export default {
  name: 'ListMenuProviders',
  data: function() {
    return {
      // Lista actualizable
      list_providers: [],
      // Info del cuadro agregar empleado
      add_provider: {
          name: 'Agregar',
          contact: 'Agregar',
          email: 'Agregar'
      },
      // Saber si se debe mostrar el cuadro de agregar
      edit_page: true,

    }
  },
  // Saber si se debe mostrar el boton de eliminar
  props: ['delete_access'],
  components: {
    Providers
  },
  methods: {
    // Se avisa que se habra la ventana de agregar
    emit_edit: function() {
      this.$emit('edit', true);
    },
    update: function(provider) {
      this.$emit('update', provider);
    },
    deleted_provider: function(state) {
      // Si se elimina se manda a actualizar la lista
      if(state)
        this.make_request();
    },
    make_request: async function() {
      // route es la ruta de server a la cual ir
      const route = '/getallproviders';
      // Se obtiene el objeto user guardado al iniciar sesion
      const user = this.$getter.getUser();

      // Se crea objeto reconocible por el server
      const provider = {
        provider: {
          type: 'provider',
          template: { company: user.company }
        }
      };

      let response = await this.$requester.post(route, provider);
      this.list_providers = response;
    },
    report: function() {
      let inventory = [];
      let content = [];
      let total = 0;
      inventory.push(['ID', 'Nombre', 'Direccion', '# Tel.', 'RFC', 'Contacto', 'Correo electronico', 'Codigo postal']);
      for(let i = 0; i < this.list_providers.length; i++) {
        content.push([
            this.list_providers[i].id,
            this.list_providers[i].name,
            this.list_providers[i].address,
            this.list_providers[i].tel,
            this.list_providers[i].rfc,
            this.list_providers[i].contact,
            this.list_providers[i].email,
            this.list_providers[i].codepostal
          ]
        );
        total++;
      }
      content.push(['Total', '', '', '', '', '', '', total]);
      inventory.push(content);

      this.$reports.write('reporte_proveedores.pdf', inventory);

    }
  },
  created: function() {
    this.make_request();
  }
}
</script>

<style scoped>
#table-report {
  margin-top: 20px;
}

.row {
  margin-top: 30px;
}

</style>
