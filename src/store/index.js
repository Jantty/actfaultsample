import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    _defaultMapView: '',//默认地图view
    _defaultThemeColor: '#409EFF',
    _defaultMapTreeVisible: false,//图层目录显示/隐藏

};
const getters = {
    _getDefaultThemeColor() {
        return state._defaultThemeColor;
    },
    _getDefaultMapView() {
        return state._defaultMapView;
    },
    _getDefaultMapTreeVisible() {
        return state._defaultMapTreeVisible;
    }
};
const mutations = {
    _setDefaultThemeColor(state, value) {
        state._defaultThemeColor = value;
    },
    _setDefaultMapView(state, value) {
        state._defaultMapView = value;
    },
    _setDefaultMapTreeVisible(state, value) {
        state._defaultMapTreeVisible = value;
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
});
export default store;
