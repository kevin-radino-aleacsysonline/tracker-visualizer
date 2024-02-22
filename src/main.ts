import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './setup/vuetify';
import router from './setup/router';

import './scss/normalize.css';
import './scss/styles.scss';
import '@mdi/font/css/materialdesignicons.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount('#app');

// import { Environment } from './types/environment';
// import * as data from './data/environments.json';

// var envArray: Environment[] = [];
// for (let i = 0; i < data.environments.length; i++) {
//     const environment = data.environments[i] as Environment;
//     envArray.push(environment);
// }

// console.log(envArray);
