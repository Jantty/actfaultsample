import Vue from 'vue';
import Router from 'vue-router';
import DataVisual from './../pages/DataVisual';
import OneMap from './../pages/OneMap';
import MultiScreen from './../components/MultiScreen'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/data',
            component: DataVisual,
        },
        {
            path: '/onemap',
            component: OneMap,
        },
        {
            path: '/onemap/morescreens',
            component: MultiScreen
        }
    ],
    mode: 'history'
});