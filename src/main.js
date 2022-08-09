import { createApp } from 'vue'
import App from './App.vue'
import router from "./plugins/router";

const app = createApp(App).use(router)

app.mount('#app')
