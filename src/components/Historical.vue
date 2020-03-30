<template>
  <div id="historical" class="container">
    <!-- Listado del historial !-->
    <div class="container">
      <div class="row">
        <div class="col">
          <h3><b>Historial</b></h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <label for="search_historial">Buscar</label>
          <input class="form-control" type="text" name="search_historial" 
            id="search_historial" placeholder="Buscar">
        </div>
        <div class="col">
          <label for="filters">Filtro</label>
          <select id="filters" class="form-control" name="filters">
            <option value="99">Todos</option>
            <option value="0">Compras</option>
            <option value="1">Ventas</option>
            <option value="2">Altas</option>
          </select>
        </div>
      </div>
    </div>

    <div class="container" id="empty-stack" v-if="historical.length == 0">
      <span>
        <img src="https://image.flaticon.com/icons/svg/1376/1376786.svg" 
          alt="empty" width="100px">
        No se han registrado acciones.
      </span>
    </div>

    <div class="container" id="historical-stack" v-else>
      <div class="list-group">
        <a v-for="fact in historical" v-bind:key="fact.key" 
          href="#" class="list-group-item list-group-item-action" 
          :class="getClasses(fact.state)">

          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1" :class="getClassesText(fact.state)">
              <img :src="require(`@/assets/icons/${getImage(fact.state)}`)" alt="estado" width="20px">
              {{fact.action}}
            </h5>
            <small :class="getClassesText(fact.state)">{{fact.time}}</small>
          </div>
          <p class="mb-1" :class="getClassesText(fact.state)">{{fact.details}}</p>
          <small :class="getClassesText(fact.state)">{{fact.responsable}}</small>

        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Requester from '@/res/Requester.js';

export default {
  name: 'Historical',
  data: function() {
    return {
      historical: [],
      requester: new Requester()
    }
  },
  methods: {
    getClasses: function(switcher) {
      return {
        // Clases para verse rojo o verde el fondo
        'list-group-item-danger': switcher == 0,
        'list-group-item-success': switcher == 1
      }
    },
    getClassesText: function(switcher) {
      return {
        // Clases para verse rojo o vere los textos
        'dangerText': switcher == 0,
        'successText': switcher == 1
      }
    },
    getImage: function(switcher) {
      // Saber que icono poner
      switch(switcher) {
        case 0: return 'minus.svg';
        case 1: return 'plus.svg';
        default: return 'star.svg';
      }
    }
  },
  created: async function() {
    // route es la ruta del server a la cual ir
    const route = '/gethistorical';
    // Se obtiene usuario del login
    const user = this.$store.getters.getUser;
    // Se crea objeto reconocible por el server
    const historial = {
      user: {
        type: 'historical',
        template: user
      }
    };

    let response = await this.requester.post(route, historial);
    this.historical = response;
  }
}
</script>

<style scoped>
#empty-stack {
  padding-top: 10%;
  text-align: center;
} #empty-stacl span {
  font-size: 16px;
} #empty-stack img {
  margin: 0px 15px;
}

#historical-stack {
  padding-top: 3%;
}

.dangerText {
  color: #962631;
}

.successText {
  color: #1F8035;
}
</style>
