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
            id="search_historial" placeholder="Buscar" v-model="text">
        </div>
        <div class="col">
          <label for="filters">Filtro</label>
          <select id="filters" class="form-control" name="filters" v-model="filter">
            <option value="99">Todos</option>
            <option value="0">Compras</option>
            <option value="1">Ventas</option>
            <option value="2">Altas</option>
            <option value="3">Bajas</option>
            <option value="4">Modificaciones</option>
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
        <a v-for="(fact, index) in historical" v-bind:key="fact.key" 
          href="#" class="list-group-item list-group-item-action" 
          :class="getClasses(fact.state)" @click.stop.prevent="report(index)">

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
export default {
  name: 'Historical',
  data: function() {
    return {
      filter: 99,
      text: '',
      historical: [],
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
    },
    getHistorical: async function() {
      // route es la ruta del server a la cual ir
      const route = (this.filter == 99) ? '/gethistorical' : '/getcategoryhistorical';
      // Se obtiene usuario del login
      const user = this.$getter.getUser();
      // Se crea objeto reconocible por el server
      let  filter = '';

      switch(parseInt(this.filter)) {
        case 99: filter = ''; break;
        case 0: filter = 'Compra'; break;
        case 1: filter = 'Venta'; break;
        case 2: filter = 'Alta'; break;
        case 3: filter = 'Baja'; break;
        case 4: filter = 'Modificacion'; break;
      }

      const historial = {
        user: {
          type: 'historical',
          template: {
            company: user.company,
            filter: filter,
            text: this.text
          }
        }
      };

      let response = await this.$requester.post(route, historial);
      this.historical = response;
    },
    report: function(index) {
      const historial = this.historical[index];
      const content = [
        historial.action,
        'Clave: ' + historial.key,
        'Empresa: ' + historial.company,
        historial.time,
        historial.details,
        'Responsable: ' + historial.responsable
      ];
      this.$reports.writeFormatOff(historial.action + '.pdf', content);
    }
  },
  watch: {
    filter: async function() {
      await this.getHistorical();
    },
    text: async function() {
      await this.getHistorical();
    }
  },
  created: async function() {
    await this.getHistorical();
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
