import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import axios from './models/axios'; // 引入创建的 Axios 实例

const app = createApp(App)

//挂载路由
app.use(router)
app.config.globalProperties.axios = axios
app.mount('#app')
