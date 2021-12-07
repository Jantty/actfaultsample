import Vue from 'vue';
import Router from 'vue-router';
import DataVisual from './../pages/DataVisual';
import OneMap from './../pages/OneMap';
import SceneMap from './../pages/SceneMap';
import MultiScreen from './../components/MultiScreen';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/data',
            component: DataVisual,
        },
        {
            path: '/map',
            component: OneMap,
        },
        {
            path: '/scenemap',
            component: SceneMap,
        },
        {
            path: '/onemap/morescreens',
            component: MultiScreen
        }
    ],
    mode: 'history'
});