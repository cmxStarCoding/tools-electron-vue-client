import axios from 'axios';
import router from '../routes';
import localStorage from '../models/storage'
import VueEvent from './event.js'

const baseURL = process.env.VUE_APP_API_BASE_URL

const api = axios.create({
    baseURL,
    // 其他配置项...
});

// 独立的 OSS 上传 axios 实例，不走任何拦截器
const ossApi = axios.create({
    // baseURL 可以不设置，传入完整 url
    // headers: 不设置任何 header
});


// 请求拦截器
api.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么，例如添加请求头
        // config.headers.Authorization = 'Bearer ' + yourAccessToken;
        let userToken = localStorage.get("user_token")

        if (userToken) {
            // config.headers.Authorization = 'Bearer ' + userToken;
            config.headers.Authorization = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Njg4MTQwNjMsImlhdCI6MTc2MDE3NDA2MywiaW1vb2MuY29tIjoiMHgwMDAwMDAwMDAwMDAwMDAxIn0.0irxL80xik5qYww6H12bCX2GQeLNjuovYOBPGalNJXc';
        }

        if(!config.headers['Content-Type']){
            config.headers['Content-Type'] = 'application/json'
        }
        // config.headers['timeout'] = 10
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
  
            VueEvent.emit("to-common-header-token-expire",{
                
            });
            router.push({ path: '/user_login' })
            // 处理 HTTP 状态码为 401 的情况，跳转至登录页面
            // 在这里你需要提供跳转至登录页面的逻辑
        }
        return Promise.reject(error);
    }
);


const apiService = {
    //检测系统更新
    // CheckSystemUpdateApi: async (params) => api.post('/api/v1/check_system_update', params),
    //用户登录
    UserLoginApi: async (params) => api.post('/v1/user/login', params),
    //用户注册
    UserRegisterApi: async (params) => api.post('v1/user/register', params),
    //用户详情
    UserDetailApi: async (params) => api.get('/v1/user/user', params),
    //Oss上传文件获取sts
    OssGetSts: async (params) => api.get('v1/user/sts', params),
    //Oss上传文件
    OssUploadFileApi: async (url,formData,config={}) => ossApi.post(url, formData,config),

    //获取会话列表
    GetImConversation: async (params) => api.get('v1/im/conversation', params),
    //获取会话列表
    GetChatRecord: async (params) => api.get('v1/im/chatlog', params),





    //忘记密码重置
    ForgetPasswordResetApi: async (params) => api.post('/api/v1/forget_password_reset', params),
    //发送邮箱验证
    SendEmailApi: async (params) => api.get('/api/v1/send_email_code', {'params':params}),
    //系统更新日志
    SystemUpdateLogApi: async (params) => api.get('/api/v1/system_update_log', {'params':params}),
    //用户退出登录
    UserLogoutApi: async (params) => api.post('/api/v1/user/logout', params),


    //编辑用户资料
    UserEditApi: async (params) => api.post('/api/v1/user/edit', params),
    //修改用户密码
    EditPasswordApi: async (params) => api.post('/api/v1/user/edit/password', params),
    //上传文件
    UploadFileApi: async (formData,config) => api.post('/api/v1/upload', formData, config),

    //意见反馈提交
    FeedbackApi: async (params) => api.post('/api/v1/feedback', params),
};

export default apiService;
