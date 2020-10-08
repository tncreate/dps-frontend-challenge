import Vue from 'vue';
import Vuex from 'vuex';
import { OfficesState } from '@/storeModules/offices.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    offices: OfficesState,
  },
});
