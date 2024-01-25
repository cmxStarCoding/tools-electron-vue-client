import axios from 'axios';
import router from '../routes';
import localStorage from '../models/storage'

const baseURL = process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_API_BASE_URL
    : process.env.VUE_APP_API_BASE_URL;

const api = axios.create({
    baseURL,
    // 其他配置项...
});

// 请求拦截器
api.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么，例如添加请求头
        // config.headers.Authorization = 'Bearer ' + yourAccessToken;
        let userToken = localStorage.get("user_token")

        if (userToken) {
            config.headers.Authorization = 'Bearer ' + userToken;
        }
        config.headers['Content-Type'] = 'application/json'
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            router.push({ path: '/user_login' })
            // 处理 HTTP 状态码为 401 的情况，跳转至登录页面
            // 在这里你需要提供跳转至登录页面的逻辑
        }
        return Promise.reject(error);
    }
);


const apiService = {
     CheckSystemUpdateApi: async (params) => api.post('/api/v1/check_system_update', params),
     UserLoginApi: async (params) => api.post('/api/v1/user/login', params),
     UserLogoutApi: async (params) => api.post('/api/v1/user/logout', params),
     UserRegisterApi: async (params) => api.post('/api/v1/user/register', params),
     UserDetailApi: async (params) => api.get('/api/v1/user', params),
     UserEditApi: async (params) => api.post('/api/v1/user/edit', params),

    // Add other API endpoints here...
};

export default apiService;
