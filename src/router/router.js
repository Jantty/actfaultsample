import Vue from 'vue';
import Router from 'vue-router';
import DataVisual from './../pages/DataVisual';
import OneMap from './../pages/OneMap';

Vue.use(Router);
// import DataSource from '../components/system/content/dataSource/DataSource.vue';

export default new Router({
    routes: [
        {
            path: '/',
            component: DataVisual,
        },
        {
            path: '/onemap',
            component: OneMap,
        }
    ],
    mode: 'history'
});