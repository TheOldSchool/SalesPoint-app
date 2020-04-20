<template>
  <div id="TemplateInventory" class="container">
    <h6><b>Agregar nuevo ingrediente</b></h6>

    <form class="mt-3" @submit.prevent="add_ingredients($event)">
      <div class="form-group">
        <div class="form-row">

          <div class="col-md-4">
            <label for="name">Nombre</label>
            <input type="text" class="form-control" id="name" name="name"
              placeholder="Tomates" required>
            <button type="submit" class="btn btn-primary btn-block mb-2 mt-3">
              Agregar
            </button>
          </div>

          <div class="col-md-4">
            <label for="amount">Cantidad</label>
            <input type="number" class="form-control" id="amount" name="amount"
              placeholder="6" min="0" required>
          </div>

          <div class="col-md-4">
            <label for="type_amount">Tipo de unidad</label>
            <select id="type_amount" class="form-control" name="type_amount" required>
              <option value="0">Unidades</option>
              <option value="1">Kg.</option>
              <option value="2">Ltrs.</option>
            </select>
          </div>

        </div>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  name: 'TemplateInventory',
  data: function() {
    return { }
  },
  methods: {
    add_ingredients: async function(event) {
      const user = this.$getter.getUser();
      let key = this.$getter.getRandomKey();
      const route = '/addinventory';
      let inventory = {
        inventory: {
          type: 'inventory',
          template: {
            company: user.company,
            ingredient: key,
            amount: event.target.amount.value,
            name: event.target.name.value,
            unit: event.target.type_amount.value
          }
        }
      };
      const response = await this.$requester.post(route, inventory);
      if(response.length == 0)
        this.$emit('refresh');
      this.clean();
    },
    clean: function() {
      document.getElementById('name').value = '';
      document.getElementById('amount').value = '';
    }
  }
}
</script>

<style scoped>
#TemplateInventory {
  margin-top: 30px;
}
</style>
