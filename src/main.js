import Vue from 'vue'
import App from './App.vue'

import Vuex from 'vuex';

import store from "./store/store";
import vuetify from './plugins/vuetify';
import {router} from "./plugins/router";

import VueResource from'vue-resource';

Vue.use(VueResource);
Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
    vuetify,
    store
}).$mount('#app');
