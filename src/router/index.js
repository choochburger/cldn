import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Development from '@/components/Development';
import Music from '@/components/Music';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/development',
      name: 'Development',
      component: Development,
    },
    {
      path: '/music',
      name: 'Music',
      component: Music,
    },
  ],
});
