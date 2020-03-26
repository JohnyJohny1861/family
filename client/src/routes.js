import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

export const routes = [
   {
      path: '', 
      components: {
         default: () => import('./components/Home.vue'),
      }
   },
   {
      path: '/signup', 
      name: 'signup',
      component: () => import('./views/SignUp'), 
   },
   {
      path: '/login', 
      name: 'login',
      component: () => import('./views/Login'), 
   }
]

export default new VueRouter({ routes, mode: 'history' })