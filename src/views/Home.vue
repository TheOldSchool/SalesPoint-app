<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col">
          <table>
            <tr>
              <td>
                <img src="../assets/logo.svg"
                  width="100px" alt="logo">
              </td>
              <td>
                <h1><strong>SalesPoint</strong></h1>
              </td>
            </tr>
          </table>
        </div>
        <div class="col-sm-3">
          <div class="btn-group">
            <button class="btn btn-secondary" v-on:click="session = true">
              Iniciar Sesion
            </button>
            <button class="btn btn-secondary" v-on:click="session = false">
              Registrarme
            </button>
          </div>
        </div>
      </div>
    </div>

    <Login v-on:header_panel="config_init_emit()" v-if="session"/>
    <Register v-on:header_panel="config_init_emit()" v-else />
  </div>
</template>

<script>
import Login from '@/components/sessions/Login.vue';
import Register from '@/components/sessions/Register.vue';

export default {
  name: 'home',
  data: function() {
    return {
      session: true
    }
  },
  components: {
    Login,
    Register
  },
  methods: {
    config_init_emit: function() {
      this.$emit('header_panel');
    }
  }
}
</script>

<style scoped>
.row {
  padding: 40px 0px;
}

h1 {
  margin-top: 30px;
  margin-left: 30px;
}

.btn-group {
  width: 100%;
  margin-top: 30px;
}
</style>
