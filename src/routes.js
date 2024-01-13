import { createRouter, createWebHashHistory } from 'vue-router'

import Home from "./views/Home.vue"
import UserLogin from "./views/user/UserLogin.vue"
import PicPaste from "./views/pic/PicPaste.vue"

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: "/home" },
        { path: '/home', component: Home },
        { path: '/user_login', component: UserLogin, name: 'user_login' },
        { path: '/pic_paste', component: PicPaste, name: 'pic_paste' }
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