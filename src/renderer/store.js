import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistedstate from 'vuex-persistedstate';
import state from './state';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    plugins: [VuexPersistedstate()],
    mutations: {
        set(state, payload) {
            if (!payload.path) return;
            let self = state;
            const list = payload.path.split('.');
            if (!list) return;
            while (list.length > 1) {
                self = self[list[0]];
                list.shift();
            }
            self[list[0]] = payload.value;
        },
        push(state, payload) {
            if (!payload.path) return;
            let self = state;
            const list = payload.path.split('.');
            while (list.length > 1) {
                self = self[list[0]];
                list.shift();
            }
            if (typeof self[list[0]] == 'object' && Array.isArray(self[list[0]])) {
                self[list[0]].push(payload.value);
            } else console.error('Commit `push` vào một thành viên không phải mảng', payload);
        },
    },
    getters: (function getter(getters, object, path = '') {
        for (const key in object) {
            if (typeof object[key] == 'object' && !Array.isArray(object[key])) {
                getter(getters, object[key], path + key + '.');
            } else {
                getters[`get:${path}${key}`] = function($state) {
                    let self = $state;
                    const list = `${path}${key}`.split('.');
                    while (list.length >= 1) {
                        self = self[list[0]];
                        list.shift();
                    }
                    return self;
                };
            }
        }
        return getters;
    })({}, state),
});
