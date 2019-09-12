import Vue from 'vue';
import Vuex from 'vuex';
import { getters } from "./vuex/getters";
import { mutations } from "./vuex/mutations";
import { actions } from "./vuex/actions";
import { state } from "./vuex/state";

Vue.use(Vuex);

export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    strict: process.env.NODE_ENV !== 'production'
})
