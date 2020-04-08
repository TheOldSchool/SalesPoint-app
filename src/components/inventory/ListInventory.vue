<template>
  <div id="listinv" class="container">
    <!-- Se crea listado de empleados !-->
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
                <input id="add_amount" type="number" name="add_amount" class="form-control"
                  placeholder="5">
              </div>
              <div class="col">
                <button class="btn btn-success">+</button>
              </div>
            </div>
          </td>
          <td>
            <div class="row">
              <div class="col">
                <input id="miss_amount" type="number" name="miss_amount" class="form-control"
                  placeholder="3">
              </div>
              <div class="col">
                <button class="btn btn-info">-</button>
              </div>
            </div>
          </td>
          <td>
            <button class="btn btn-danger">Eliminar</button>
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
      list_ingredients: [{
        name: 'Tomates',
        amount: 45
      }],
    }
  },
  props: ['refresh'],
  watch: {
    refresh: function() {
      if(this.refresh) {
        this.make_request();
        this.$emit('not_refresh');
      }
    }
  },
  methods: {
    make_request: async function() {
      const user = this.$getter.getUser();
      const route = '/getinventory';
      const inventory = {
        inventory: {
          type: 'inventory',
          template: {
            company: user.company
          }
        }
      };

      const response = await this.$requester.post(route, inventory);
      this.list_ingredients = response;
    }
  },
  created: function() {
    this.make_request();
  }
}
</script>

<style scoped>
table {
  margin-top: 30px;
}
</style>
