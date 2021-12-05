import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    _defaultMapView: '',//默认地图view
    _defaultMapTreeVisible: false,//图层目录显示/隐藏
    _defaultXZQHVisible: false,

    _defaultQueryResultVisible: false,
    _defaultQueryResult: []


};
const getters = {
    _getDefaultMapView() {
        return state._defaultMapView;
    },
    _getDefaultMapTreeVisible() {
        return state._defaultMapTreeVisible;
    },
    _getDefaultXZQHVisible() {
        return state._defaultXZQHVisible;
    },
    getDefaultQueryResultVisible() {
        return state._defaultQueryResultVisible;
    },
    getDefaultQueryResult() {
        return state._defaultQueryResult;
    }


};
const mutations = {
    _setDefaultMapView(state, value) {
        state._defaultMapView = value;
    },
    _setDefaultMapTreeVisible(state, value) {
        state._defaultMapTreeVisible = value;
    },
    _setDefaultXZQHVisible(state, value) {
        state._defaultXZQHVisible = value;
    },
    _setDefaultQueryResultVisible(state, value) {
        state._defaultQueryResultVisible = value;
    },
    _setDefaultQueryResult(state, value) {
        state._defaultQueryResult = value;
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
});
export default store;
