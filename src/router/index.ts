import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import BezierPathExample from '../views/BezierPathExample.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bezier-path-example',
    name: 'BezierPathExample',
    component: BezierPathExample
  }
];

const router = new VueRouter({
  routes
});

export default router;
