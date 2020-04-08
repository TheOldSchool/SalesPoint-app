import Vue from 'vue';
import Vuex from 'vuex';
import Order from '@/res/Order.js';
import Car from '@/res/Car.js';

Vue.use(Vuex);

export const store =  new Vuex.Store({
  state: {
    index: 0,
    order: new Order(),
    cars: [new Car()],
  },
  mutations: {
    addCar: function(state, new_car) {
      state.cars.push(new_car);
    },
    addOrder: function(state) {
      state.cars[state.index].addOrder(state.order);
      state.order = new Order();
    },
    addProduct: function(state, product) {
      state.order.addProduct(product);
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
    addOrder_action: function({commit}) {
      commit('addOrder');
    },
    addProduct_action: function({commit}, product) {
      commit('addProduct', product);
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
    getOrder: function(state) {
      return state.order;
    },
  }
})
