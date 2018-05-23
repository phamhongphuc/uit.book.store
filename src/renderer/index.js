import './style/index.scss';

import Vue from 'vue';
import app from './vue/app/app.vue';
new Vue({
    render: h => h(app, { name: 'app', ref: 'app' }),
}).$mount('#app');
