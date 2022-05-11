import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { store } from "./stores";

import io from "socket.io-client";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.globalProperties.$socket = io("http://localhost:8000");
app.config.globalProperties.$store = store();

app.mount('#app')