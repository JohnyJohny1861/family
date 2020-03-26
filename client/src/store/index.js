import Vuex from 'vuex';
import Vue from 'vue';

import user from './modules/user';
import expense from './modules/expense';

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
      userModule: user,
      expenseModule: expense,
   }
})