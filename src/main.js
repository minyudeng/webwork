import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import elementIcon from "./plugins/icons"


const app = createApp(App)
app
.use(elementIcon)
.use(store)
.use(router)
.mount('#app')
