import Vue from 'vue';
import Vuex from 'vuex';
import Car from '@/res/Car.js';

Vue.use(Vuex);

export const store =  new Vuex.Store({
  state: {
    index: 0,
    cars: [],
  },
  mutations: {
    addCar: function(state, new_car) {
      state.cars.push(new_car);
    },
    addOrder: function(state, order) {
      state.cars[state.index].addOrder(order);
    },
    makePurchases: function(state) {
      let tmp_cars = [];
      for(let i=0; i < state.cars.length; i++) {
        if(i != state.index) {
          tmp_cars.push(state.cars[i]);
        }
      }

      state.index = 0;
      state.cars = tmp_cars;
      if(state.cars.length == 0)
        state.cars.push(new Car());
    }
  },
  actions: {
    addCar_action: function({commit}, car) {
      commit('addCar', car);
    },
    addOrder_action: function({commit}, order) {
      commit('addOrder', order);
    },
    makePurchases_action: function({commit}) {
      commit('makePurchases');
    }
  },
  getters: {
    getCar: function(state) {
      return state.cars[state.index];
    },
    getOrders: function(state) {
      return state.cars[state.index].getOrders();
    },
    getTotal: function(state) {
      return state.cars[state.index].getTotal();
    },
    getSubtotal: function(state) {
      return state.cars[state.index].getSubtotal();
    },
    getDiscount: function(state) {
      return state.cars[state.index].getDiscount();
    },
    getIndex: function(state) {
      return state.index;
    },
    getProducts: function(state) {
      return state.cars[state.index].getOrders().getProducts();
    },
    getRandomKey: function() {
      let mask = 'abcdefghijklmnopqrstuvwxyz';
      mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      mask += '0123456789';
      let generated_key = '';

      for (var i = 15; i > 0; --i)
        generated_key += mask[Math.floor(Math.random() * mask.length)];
      return generated_key;
    },
    getUser: function() {
      const thereLocal = localStorage.getItem('user');
      let user = (thereLocal == undefined) ?
        JSON.parse(sessionStorage.getItem('user')) :
        JSON.parse(localStorage.getItem('user'));
      return user;
    }
  }
})
