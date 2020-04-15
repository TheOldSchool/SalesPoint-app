<template>
  <div id="listinv" class="container">
    <!-- Se crea listado de empleados !-->
    <table id="table-report">
      <tr>
        <td><b>Reporte de inventario</b></td>
        <td><button class="btn btn-success" @click="report">Generar</button></td>
      </tr>
    </table>

    <table class="table">
      <thead class="bg-info">
        <tr>
          <th scope="col">
            <span class="text-light">Nombre</span>
          </th>
          <th scope="col">
            <span class="text-light">Cantidad</span>
          </th>
          <th scope="col">
            <span class="text-light">Agregar</span>
          </th>
          <th scope="col">
            <span class="text-light">Disminuir</span>
          </th>
          <th scope="col">
            <span class="text-light">Eliminar</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingredient in list_ingredients" v-bind:key="ingredient.key">
          <td>{{ingredient.name}}</td>
          <td>{{ingredient.amount}}</td>
          <td>
            <div class="row">
              <div class="col">
                <input type="number" name="add_amount" class="form-control"
                  placeholder="5" :id="'add-' + ingredient.key">
              </div>
              <div class="col">
                <button class="btn btn-success" @click="add(ingredient.key)">+</button>
              </div>
            </div>
          </td>
          <td>
            <div class="row">
              <div class="col">
                <input type="number" name="miss_amount" class="form-control"
                  placeholder="3" :id="'sub-' + ingredient.key">
              </div>
              <div class="col">
                <button class="btn btn-info" @click="substract(ingredient.key)">-</button>
              </div>
            </div>
          </td>
          <td>
            <button class="btn btn-danger" @click="remove(ingredient.key)">Eliminar</button>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ListInventory',
  data: function() {
    return {
      list_ingredients: [],
    }
  },
  props: ['refresh'],
  watch: {
    refresh: function() {
      if(this.refresh) {
        this.getList();
        this.$emit('not_refresh');
      }
    }
  },
  methods: {
    make_request: async function(route, params) {
      const response = await this.$requester.post(route, params);
      return response;
    },
    add: async function(key) {
      const input = document.getElementById('add-' + key);
      const value = -1 * parseFloat(input.value);
      await this.reinventory(key, value);
      input.value = '';
    },
    substract: async function(key) {
      const input = document.getElementById('sub-' + key);
      const value = parseFloat(input.value);
      await this.reinventory(key, value);
      input.value = '';
    },
    remove: async function(key) {
      if(confirm('¿Desea eliminar del inventario?')) {
        const route = '/delinventory';
        const inventory = {
          inventory: {
            type: 'inventory',
            template: {
              ingredient: key
            }
          }
        };

        const response = await this.make_request(route, inventory);
        if(response.length == 0)
          await this.getList();
      }
    },
    reinventory: async function(key, amount) {
      const route = '/updinventory';
      const inventory = {
        inventory: [{
          type: 'inventory',
          template: {
            ingredient: key,
            amount: amount
          }
        }]
      };

      const response = await this.make_request(route, inventory);
      if(response.length == 0)
        await this.getList();
    },
    getList: async function() {
      const route = '/getinventory';
      const inventory = {
        inventory: {
          type: 'inventory',
          template: {
            company: this.$getter.getUser().company
          }
        }
      };

      const response = await this.make_request(route, inventory);
      this.list_ingredients = response;
    },
    report: function() {
      let inventory = [];
      let content = [];
      let total = 0;
      inventory.push(['Nombre', 'Cantidad']);
      for(let i = 0; i < this.list_ingredients.length; i++) {
        content.push([this.list_ingredients[i].name, this.list_ingredients[i].amount]);
        total += parseFloat(this.list_ingredients[i].amount);
      }
      content.push(['Total', total]);
      inventory.push(content);

      this.$reports.write('reporte_inventario.pdf', inventory);
    }
  },
  created: async function() {
    await this.getList();
  }
}
</script>

<style scoped>
table {
  margin-top: 30px;
}

</style>
