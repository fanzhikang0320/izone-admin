import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Admin from '@/views/Admin.vue'
const routes = [
    {
        path: '/',
        redirect: '/admin'
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin
    },
    {
        path: '/login',
        name: 'login',
        component: () => import ('@/views/Login.vue')
    },
    {
        path: '/Error',
        name: 'error',
        component: () => import ('@/views/Error.vue')
    }
];
const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;