import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Development from '@/components/Development';
import Music from '@/components/Music';
import devItems from '@/data/dev';

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
      props: {
        items: devItems,
      },
    },
    {
      path: '/music',
      name: 'Music',
      component: Music,
    },
  ],
});
