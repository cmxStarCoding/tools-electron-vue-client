import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import axios from './models/axios'; 
import GlobalDataMethodsMixin from './mixin/globalDataMethodsMixin';

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/reset.css';
const app = createApp(App)

// app.config.productionTip = false;
//挂载路由
app.use(router)
// app.use(Antd);
app.config.globalProperties.axios = axios

app.mixin(GlobalDataMethodsMixin);

app.mount('#app')
