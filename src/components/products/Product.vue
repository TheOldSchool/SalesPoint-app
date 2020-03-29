<template lang="html">
  <div class="product-card">
    <button class="btn card-button" @click="try_emit()"
      @mouseover="hover = true" @mouseleave="hover = false">

      <div class="col-lg-12 text-center">
        <img id="icon" :src="require(`@/assets/${img}`)" alt="icon" width="80%" 
          v-if="edit_access" >
        <img id="icon" :src="product.photo" alt="icon" width="100%" height="150px"
          v-else >
      </div>
      <div class="col-lg-12">
        <h6><b :class="{ card_hover_text: hover }">{{product.name}}</b></h6>
      </div>

      <div class="col-lg-12">
        <span>
          <b :class="{ card_hover_text: hover }">
            <span :class="{ card_hover_text: hover }" v-if="!edit_access">$</span>
            {{product.price}}
          </b>
        </span>
      </div>

    </button>

    <div class="btn-group" role="group" v-if="!edit_access && delete_access">
      <button class="btn btn-outline-danger" @click="delete_product(product.key)" >
        Eliminar
      </button>
    </div>
    <button type="button" class="btn btn-outline-success add-car" v-else-if="!edit_access" >
      + Carrito
    </button>

  </div>
</template>

<script>
import Requester from '@/res/Requester.js';

export default {
  name: 'Product',
  data: function() {
    return {
      hover: false,
      requester: new Requester()
    }
  },
  props: ['product', 'img', 'selected_key', 'edit_access', 'delete_access'],
  methods: {
    set_selected_key: function(key) {
      this.selected_key = key;
    },
    try_emit: function() {
      if(this.edit_access)
        this.$emit('edit', true);
      else
        this.$emit('pushing_product', this.product);
    },
    delete_product: async function(key) {
      if(confirm('¿Desear eliminar el producto?')) {
        const route = '/delproduct';
        const product = {
          product: {
            type: 'product',
            template: { key: key }
          }
        };

        const response = await this.requester.post(route, product);

        if(response.length == 0)
          this.$emit('deleted', true);
        else
          this.$emit('deleted', false);
      }
    }
  }
}
</script>

<style lang="css" scoped>
.product-card {
  height: 320px;
  margin: 10px auto;
  border-radius: 5px;
  border: 1px solid rgba(0,0,0,0.15);
  transition: ease-in 100ms;
} .product-card:hover {
  border: 1px solid rgba(0,0,0,0.45);
}

.card_hover_text {
  color: var(--dark-green);
}

.product-card button {
  width: 100%;
} .product-card img {
border-radius: 10px;
  padding: 8px;
} h6 {
  height: 60px;
  padding: 10px 0px;
}

.btn-group {
  width: 90%;
}

.add-car {
  width: 90% !important;
}
</style>
