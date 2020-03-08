<template lang="html">
  <div id="market" class="row">
    <div class="col-sm-2">
      <aside id="nav-menu">
        <Menu @changeMenu="changeMenu" />
      </aside>
    </div>
    <div class="col">
      <aside id="nav-car" v-show="false">
        <div class="container">
          <MarketCar />
        </div>
      </aside>
      <ListMenu :menu="menu" :edit_page="false" />
    </div>
  </div>
</template>

<script>
import Menu from '@/components/menus/Menu.vue';
import MarketCar from '@/components/MarketCar.vue';
import ListMenu from "@/components/menus/ListMenu.vue";

export default {
  name: 'Market',
  data: function() {
    return {
      menu: null,
    }
  },
  components: {
    MarketCar,
    Menu,
    ListMenu
  },
  methods: {
    changeMenu: function(menu) {
      this.menu = menu;
    }
  }
}
</script>

<style lang="css" scoped>
#market {
  height: 100vh;
  background-color: #fff;
}

aside {
  height: 100%;
} #nav-menu {
  padding-top: 20px;
}

#nav-car {
  position: fixed;
  right: 0;
  z-index: 1;
  background-color: white;
}

.row {
  width: 100%;
}
</style>
