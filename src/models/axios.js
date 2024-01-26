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

        if(!config.headers['Content-Type']){
            config.headers['Content-Type'] = 'application/json'
        }
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
    //检测系统更新
     CheckSystemUpdateApi: async (params) => api.post('/api/v1/check_system_update', params),
     //用户登录
     UserLoginApi: async (params) => api.post('/api/v1/user/login', params),
     //用户退出登录
     UserLogoutApi: async (params) => api.post('/api/v1/user/logout', params),
     //用户注册
     UserRegisterApi: async (params) => api.post('/api/v1/user/register', params),
     //用户详情
     UserDetailApi: async (params) => api.get('/api/v1/user', params),
     //编辑用户资料
     UserEditApi: async (params) => api.post('/api/v1/user/edit', params),
     //修改用户密码
     EditPasswordApi: async (params) => api.post('/api/v1/user/edit/password', params),
     //忘记密码重置
     ForgetPasswordResetApi: async (params) => api.post('/api/v1/forget_password_reset', params),
     //上传文件
     UploadFileApi: async (formData) => api.post('/api/v1/upload', formData, {'headers':{
        'Content-Type':"multipart/form-data"
     } }),
     //发送邮箱验证
     SendEmailApi: async (params) => api.get('/api/v1/send_email_code', {'params':params}),
    //用户任务列表
    UserTaskListApi: async (params) => api.get('/api/v1/user_task_log', {'params':params}),
    //用户使用记录
    UserUseLogApi: async (params) => api.get('/api/v1/user_use_log', {'params':params}),
    //系统更新日志
    SystemUpdateLogApi: async (params) => api.get('/api/v1/system_update_log', {'params':params}),
    //系统更新日志
    CateToolsListApi: async (params) => api.get('/api/v1/cate_tools_list', {'params':params}),
    //工具列表
    ToolsListApi: async (params) => api.get('/api/v1/tools_list', {'params':params}),
};

export default apiService;
