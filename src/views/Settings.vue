<template>
  <div class="row">
    <div class="col-sm-2">
      <MenuSettings @change_window="change_window" />
    </div>
    <div class="col">
      <div id="admin-product" class="container">
        <div class="row">
          <div class="col-lg"></div>
          <div class="col-sm-2">
            <button class="btn btn-danger" v-on:click="$router.push({name: 'market'})">
              Menu Principal
            </button>
          </div>
        </div>
      </div>

      <SettingProducts @change_window="change_window" @edit_mode="edit_mode"
        :edit_product_menu="list" v-if="type == 'products'"/>

      <SettingEmployee @change_window="change_window" @edit_mode="edit_mode" 
        :edit_employee_menu="list" v-else-if="type == 'employees'" />

      <SettingProviders @change_window="change_window" @edit_mode="edit_mode"
        :edit_menu="list" v-else-if="type == 'providers'" />

      <SettingInventory @change_window="change_window" @edit_mode="edit_mode"
        :edit_menu="list" v-else-if="type == 'inventory'" />

      <Shopping @change_window="change_window" @edit_mode="edit_mode"
        :edit_menu="list" v-else-if="type == 'shopping'" />

      <Historical v-else-if="type == 'historical'" />

      <Profile v-else-if="type == 'profile'" />

      <Backup v-else-if="type == 'backup'" />
    </div>
  </div>
</template>

<script>
import MenuSettings from "@/components/menus/MenuSettings.vue";
import SettingProducts from "@/components/products/SettingProducts.vue";
import SettingEmployee from "@/components/employees/SettingEmployee.vue";
import SettingProviders from "@/components/providers/SettingProviders.vue";
import SettingInventory from '@/components/inventory/SettingInventory.vue';
import Shopping from '@/components/Shopping.vue';
import Historical from "@/components/Historical.vue";
import Profile from '@/components/Profile.vue';
import Backup from '@/components/Backup.vue';

export default {
  name: "Settings",
  data: function() {
      return {
        type: 'products',
        list: false
      }
  },
  methods: {
    change_window: function(window) {
      this.type = window;
      this.list = false;
    },
    edit_mode: function(mode) {
      this.list = mode;
    }
  },
  components: {
      MenuSettings,
      SettingProducts,
      SettingEmployee,
      SettingProviders,
      SettingInventory,
      Shopping,
      Historical,
      Profile,
      Backup
  }
};
</script>

<style scoped>
.row {
    width: 100%;
}

#admin-product {
  padding-top: 20px;
} #admin-product button {
  width: 100%;
}
</style>
