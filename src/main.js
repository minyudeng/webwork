import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import elementIcon from "./plugins/icons"
import naive from 'naive-ui'

const app = createApp(App)
app
.use(elementIcon)
.use(store)
.use(router)
.use(naive)
.mount('#app')
