import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    _defaultThemeColor: '#409EFF',
    _defaultView: '',//默认地图view
};
const getters = {
    _getDefaultThemeColor() {
        return state._defaultThemeColor;
    },
    _getDefaultView() {
        return state._defaultView;
    }
};
const mutations = {
    _setDefaultThemeColor(state, value) {
        state._defaultThemeColor = value;
    },
    _setDefaultView(state, value) {
        state._defaultView = value;
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
});
export default store;
