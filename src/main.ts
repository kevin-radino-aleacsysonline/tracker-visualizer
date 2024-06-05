import App from './App.vue';
import vuetify from './setup/vuetify';
import router from './setup/router';
import { createApp } from 'vue';

import './scss/normalize.css';
import './scss/styles.scss';
import '@mdi/font/css/materialdesignicons.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount('#app');
