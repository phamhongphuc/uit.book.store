import Vue from 'vue';
import store from './store';
import app from './vue/app/app.vue';
import './style/index.scss';

new Vue({
    store,
    render: h => h(app, { name: 'app', ref: 'app' }),
}).$mount('#app');
