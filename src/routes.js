import { createRouter, createWebHashHistory } from 'vue-router'

import Home from "./views/Home.vue"
import UserLogin from "./views/user/UserLogin.vue"
import UserRegister from "./views/user/UserRegister.vue"
import ResetPassword from "./views/user/ResetPassword.vue"
import PicPaste from "./views/pic/PicPaste.vue"
import SystemSetting from "./views/system/Setting.vue"
import AboutUs from "./views/system/AboutUs.vue"
import UpdateLog from "./views/system/UpdateLog.vue"
import PersonCenter from "./views/user/PersonCenter.vue"
import RechargeVip from "./views/vip/RechargeVip.vue"


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: "/home" },
        { path: '/home', component: Home },
        //用户登录
        { path: '/user_login', component: UserLogin, name: 'user_login' },
        //用户注册
        { path: '/user_register', component: UserRegister, name: 'user_register' },
        //重置密码
        { path: '/reset_password', component: ResetPassword, name: '/reset_password' },
        //贴图工具
        { path: '/pic_paste', component: PicPaste, name: 'pic_paste' },
        //系统设置
        { path: '/system_setting', component: SystemSetting, name: 'system_setting' },
        //关于我们
        { path: '/about_us', component: AboutUs, name: 'about_us' },
        //关于我们
        { path: '/update_log', component: UpdateLog, name: 'update_log' },
        //个人中心
        { path: '/person_center', component: PersonCenter, name: 'person_center' },
        //vip充值
        { path: '/recharge_vip', component: RechargeVip, name: 'recharge_vip' }
    ],
})


// 全局前置守卫 可用来判断一些路由是否用户是否可以访问等
router.beforeEach((to, from, next) => {
    const bool = true;
    if (!bool) {
        next({ path: '/user_login' });
    } else {
        next();
    }
});


export default router