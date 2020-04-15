<template>
  <div id="providers" class="container">
    <button class="btn card-button" @click="try_emit()"
      @mouseover="hover = true" @mouseleave="hover = false">

      <!-- Se genera cuadro de provider con info de provider !-->
      <div class="col-lg-12 text-center">
        <img id="icon" :src="require(`@/assets/${img}`)" alt="icon" width="80%" 
          v-if="edit_access" >
        <img id="icon" :src="provider.photo" alt="icon" width="100%" height="150px"
          v-else >
      </div>
      <div class="col-lg-12">
        <h6><b :class="{ card_hover_text: hover, opacity: edit_access }">{{provider.name}}</b></h6>
      </div>
      <div class="col-lg-12">
        <h6 :class="{ opacity: edit_access }">{{provider.contact}}</h6>
        <h6 :class="{ opacity: edit_access }">{{provider.email}}</h6>
      </div>

      <div class="btn-group" role="group" v-if="edit_access">
        <button class="btn btn-outline-success">
          Agregar
        </button>
      </div>

    </button>

    <div class="btn-group" role="group" v-if="!edit_access && delete_access">
      <button class="btn btn-outline-danger" @click="delete_provider(provider.id)" >
        Eliminar
      </button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Provider',
  data: function() {
    return {
      hover: false
    }
  },
  // provider es el objeto con los datos del proveedor
  // img la imagen a poner
  // edit_acces una bandera de si es el boton de agregar
  // delete access una bandera de si se puede eliminar o no
  props: ['provider', 'img', 'edit_access', 'delete_access'],
  methods: {
    try_emit: async function() {
      if(this.edit_access)
        this.$emit('edit', true);
      else if(!this.edit_access && this.delete_access) {
        this.$emit('update', this.provider);
      }
    },
    delete_provider: async function(id) {
      if(confirm('¿Desea eliminar este proveedor?')) {
        const route = '/delprovider';
        const provider = {
          provider: {
            type: 'provider',
            template: { id: id }
          }
        };

        const response = await this.$requester.post(route, provider);
        if(response.length == [])
          this.$emit('deleted', true);
        else
          this.$emit('deleted', false);
      }
    }
  }
}
</script>

<style scoped>
#providers {
  height: 320px;
  margin: 10px auto;
  border-radius: 5px;
  border: 1px solid rgba(0,0,0,0.15);
  transition: ease-in 100ms;
} #providers:hover {
  border: 1px solid rgba(0,0,0,0.45);
}

.card_hover_text {
  color: var(--dark-green);
}

.opacity {
  opacity: 0;
}

#providers button {
  width: 100%;
} #providers img {
  padding: 8px;
  border-radius: 10px;
} h6 {
  padding: 2px 0px;
}

.btn-group {
  width: 100%;
} .btn {
  outline: none !important;
}
</style>
