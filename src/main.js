import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import router from './router'

import { store } from './store/index.js';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import Getter from './res/Getter.js'
import Requester from './res/Requester.js';
import Historical from './res/Historical.js';
import Reports from './res/Reports.js';

Vue.config.productionTip = false;
Vue.use(Vuex);

Vue.prototype.$getter = new Getter()
Vue.prototype.$requester = new Requester()
Vue.prototype.$historical = new Historical()
Vue.prototype.$reports = new Reports()

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
