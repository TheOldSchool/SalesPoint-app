<template>
  <div id="app" class="bg-light">
    <Header :session="session" @header_alarm="session = true" />

    <div id="content">
      <router-view v-on:header_panel="config_init()"/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
  name: 'App',
  data: function() {
    return {
      session: false
    }
  },
  components: {
    Header
  },
  methods: {
    config_init: function() {
      this.session = true;
    }
  }
}
</script>

<style>
@font-face {
  font-family: "Varela Round";
  src: url("./assets/fonts/VarelaRound-Regular.ttf");
}

:root {
  --main-green: #26b99a;
  --dark-green: #14a085;
  --darker-green: #0D6B58;
}

* {
  margin: 0;
  padding: 0;
  outline: none;
  color: #434545;
  font-family: 'Varela Round', sans-serif;
}

#content {
  min-height: 100vh;
  background-color: white;
}

.market-btn {
  color: white !important;
  background-color: var(--main-green) !important;
} .market-btn:hover {
  color: white !important;
  background-color: var(--dark-green) !important;
}

.shadow {
  box-shadow: 0px 7px 42px -6px rgba(0,0,0,0.75) !important;
}
</style>
