<template>
  <div id="TemplateInventory" class="container">
    <h6><b>Agregar nuevo ingrediente</b></h6>

    <form class="mt-3" @submit.prevent="add_ingredients($event)">
      <div class="form-group">
        <div class="form-row">

          <div class="col">
            <label for="name">Nombre</label>
            <input type="text" class="form-control" id="name" name="name"
              placeholder="Tomates" required>
          </div>

          <div class="col">
            <label for="amount">Cantidad</label>
            <input type="number" class="form-control" id="amount" name="amount"
              placeholder="6" required>
          </div>

        </div>
      </div>

      <button type="submit" class="btn btn-primary mb-2">
        Agregar
      </button>
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
            name: event.target.name.value
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
