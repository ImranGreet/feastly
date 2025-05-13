import { createApp } from 'vue';
/*style assets*/
import './assets/tailwind.css';
import './assets/style.css';

import { createPinia } from 'pinia';
import router from './routes';
import App from './App.vue';

const pinia = createPinia();

/* global button component*/
import XenButton from './components/shared/XenButton.vue';

const app = createApp(App);
app.use(router).use(pinia).component('XenButton', XenButton).mount('#app');
