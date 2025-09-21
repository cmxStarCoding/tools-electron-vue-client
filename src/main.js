import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
// import axios from './models/axios'; 
import GlobalDataMethodsMixin from './mixin/globalDataMethodsMixin';


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/reset.css';

const app = createApp(App)

// app.config.productionTip = false;
//挂载路由
app.use(router)
//挂载Antd到全局
// app.use(Antd);
//挂载axios到全局
// app.config.globalProperties.axios = axios

app.mixin(GlobalDataMethodsMixin);
app.use(ElementPlus)
app.mount('#app')
