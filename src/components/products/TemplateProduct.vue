<template>
  <div id="template-product" class="container">
    <!-- Altas de productos !-->
    <form v-on:submit.prevent="add_product">
      <h4><b>Panel de control</b></h4>
      <table>
        <tr>
          <td>
            <img src="https://image.flaticon.com/icons/svg/1573/1573347.svg" 
                 alt="icon" width="40px" id="img" name="img">
          </td>
          <td class="align-bottom">
            <h5><b>Productos</b></h5>
          </td>
        </tr>
      </table>

      <div class="form-group">
        <label for="photo">Icono de Producto</label>
        <input type="file" class="form-control-file" id="product_img" name="product_img">
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label for="name">Nombre</label>
          <input type="text" class="form-control" id="name" required>
        </div>
      </div>

      <div class="form-group">
        <label for="desc">Descripción</label>
        <textarea name="desc" id="desc" class="form-control" required></textarea>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="price">Precio</label>
          <input type="text" class="form-control" id="price" required>
        </div>
        <div class="form-group col-md-6">
          <label for="ingredients_product">Ingredientes</label>
          <select id="ingredients_product" class="form-control">
            <option selected>Choose...</option>
            <option>...</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label for="category">Categoria</label>
          <select id="category" class="form-control" name="category">
            <option v-for="category in categories" :value="category.type" 
              v-bind:key="category.type">
              {{category.name}}
            </option>
          </select>
        </div>
      </div>

      <button type="submit" id="add-product"
        class="btn btn-primary">
          Agregar Producto
      </button>
    </form>

    <div class="alert" :class="{ 'alert-primary': okay, 'alert-danger': !okay }" role="alert" 
      v-show="alert_show" @click="alert_show = false">
      {{ message_alert }}
    </div>
  </div>
</template>

<script>
import Product from "@/res/Product.js";
import Requester from '@/res/Requester.js';

export default {
  name: "TemplateProduct",
  data: function() {
    return {
      // Tipos de productos
      categories: [
        {name: 'Desayunos', type: 0},
        {name: 'Entradas', type: 1},
        {name: 'Platillo principal', type: 2},
        {name: 'Cena', type: 3},
        {name: 'Postres', type: 4},
        {name: 'Bebidas', type: 5},
      ],
      // Cambia color de mensaje
      okay: false,
      // Cambia la visibilidad del mensaje
      alert_show: false,
      // Cambia el texto del mensaje
      message_alert: '',
      requester: new Requester(),
    }
  },
  methods: {
    send_product: async function(product) {
      // route es la ruta del server a la cual ir
      const route = '/addproduct';

      // Enviar archivos con postFile
      const response = await this.requester.postFile(route, product);
      this.validate_response(response);
    },
    add_product: function(event) {
      // Se genera una key aleatoria con $store
      let key = this.$store.getters.getRandomKey;
      let img = event.target.product_img.files[0];
      // Se obtiene el objeto user del login
      const user = this.$store.getters.getUser;

      // Genera un objeto Producto
      let product = new Product(key, user.company);
      // build para crear su info apartir del event del formulario
      product.build(event);
      product.setAction(2);

      // Enviar imagenes con FormData
      let formData = new FormData();
      formData.append('img', img);
      formData.append('product', JSON.stringify(product.serialize()));
      this.send_product(formData);
    },
    validate_response: function(response) {
      if(response.length == 0) {
        this.okay = true;
        this.message_alert = 'Se agregó producto correctamente';
      } else {
        this.okay = false;
        this.message_alert = 'Hubo un problema al agregar el producto';
      }

      this.alert_show = true;
    }
  }
};
</script>

<style scoped>
#template-product {
  height: 100vh;
  padding-top: 40px;
  background-color: #fff;
}

form {
  padding-bottom: 40px;
}

table tr td{
  padding: 30px 10px;
}

#desc-product {
  resize: none;
}

#add-product {
  width: 100%;
}

.alert {
  position: fixed;
  bottom: 0;
  width: 70%;
  margin-left: 50%;
  left: -28%;
  margin-bottom: 50px;
}
</style>
