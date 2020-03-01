<template lang="html">
  <div class="product-card">
    <button class="btn card-button" @click="try_emit()"
      @mouseover="hover = true" @mouseleave="hover = false">

      <div class="col-lg-12 text-center">
        <img id="icon" :src="require(`@/assets/${img}`)" alt="icon" width="80%">
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
  </div>
</template>

<script>
export default {
  name: 'Product',
  data: function() {
    return {
      hover: false,
    }
  },
  props: ['product', 'img', 'selected_key', 'edit_access'],
  methods: {
    set_selected_key: function(key) {
      this.selected_key = key;
    },
    try_emit: function() {
      if(this.edit_access)
        this.$emit('edit', true);
    }
  }
}
</script>

<style lang="css" scoped>
.product-card {
  margin: 10px auto;
  border-radius: 5px;
  border: 1px solid rgba(0,0,0,0.15);
  transition: ease-in 100ms;
} .product-card:hover {
  border: 1px solid rgba(0,0,0,0.45);
  /*box-shadow: 0px 7px 20px -6px rgba(0,0,0,0.55);*/
}

.card_hover_text {
  color: var(--dark-green);
}

.product-card button {
  width: 100%;
} .product-card img {
  padding: 8px;
} h6 {
  height: 60px;
  padding: 10px 0px;
}
</style>
