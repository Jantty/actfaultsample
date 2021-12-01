import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    _defaultMapView: '',//默认地图view
    _defaultThemeColor: '#409EFF',
    _defaultMapTreeVisible: false,//图层目录显示/隐藏
    _defaultMultiScreensVisible: false,
    _defaultXZQHVisible: false,

    _defaultMultiScreenLeftView: '',
    _defaultMultiScreenRightView: ''


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
    },
    _getDefaultXZQHVisible() {
        return state._defaultXZQHVisible;
    },

    _getDefaultMultiScreensVisible() {
        return state._defaultMultiScreensVisible;
    },
    _getDefaultMultiScreenLeftView() {
        return state._defaultMultiScreenLeftView;
    },
    _getDefaultMultiScreenRightView() {
        return state._defaultMultiScreenRightView;
    },





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
    },
    _setDefaultXZQHVisible(state, value) {
        state._defaultXZQHVisible = value;
    },

    _setDefaultMultiScreensVisible(state, value) {
        state._defaultMultiScreensVisible = value;
    },
    _setDefaultMultiScreenLeftView(state, value) {
        state._defaultMultiScreenLeftView = value;
    },
    _setDefaultMultiScreenRightView(state, value) {
        state._defaultMultiScreenRightView = value;
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
});
export default store;
