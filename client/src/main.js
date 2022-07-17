import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { store } from "./stores";

import io from "socket.io-client";

const app = createApp(App)

const SOCKET_URL = process.env.NODE_ENV == "development" ? "http://localhost:8000" : "http://server.pri-chat.com";

app.use(createPinia())
app.use(router)
app.config.globalProperties.$socket = io(SOCKET_URL);
app.config.globalProperties.$store = store();

app.mount('#app')