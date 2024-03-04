import './assets/main.css'

import { Quasar, Dialog, Loading, Notify } from "quasar";
import piniaPersist from 'pinia-plugin-persist'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Store } from './stores/index.js';
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Vue Axios

import axios from 'axios'
import VueAxios from 'vue-axios'

// import icon library
import '@quasar/extras/material-icons/material-icons.css';
// import Quasar css
import 'quasar/src/css/index.sass';

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()

//This allows pinia to use local storage
pinia.use(piniaPersist)

app.use(Toast)
app.use(pinia)
app.use(router)

app.use(Quasar, {
    plugins: {
        Dialog,
        Loading,
        Notify
    }
});


// Provide Pinia Store globally
app.provide('store', Store);

// Use vue-axios
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'

app.mount('#app')
