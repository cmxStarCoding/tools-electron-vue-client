import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        //测试路由-系统更新
        { path: '/system_update', component: () => import('./views/test/SystemUpdate.vue'), name: 'system_update' },
        //测试路由-下载文件展示进度
        { path: '/upload_process', component: () => import('./views/test/UploadProcess.vue'), name: 'upload_process' },
        { path: '/', redirect: "/chat" },
        {
            path: '/chat', component: () => import('./views/ChatPage.vue'),
            children: [
                {
                    path: '', // 默认子路由（访问 /chat 时自动显示 home）
                    redirect: 'home'
                },
                {
                    path: '/home', // 实际访问路径为 /chat/friend
                    component: () => import('./views/Home.vue'),
                    name: 'home'
                },
                {
                    path: '/group_friend_and_new_friend', // 实际访问路径为 /chat/group
                    component: () => import('./views/social/GroupFriendAndNew.vue'),
                    name: 'group_friend_and_new_friend'
                },
                {
                    path: '/system_setting', // 实际访问路径为 /chat/group
                    component: () => import('./views/system/Setting.vue'),
                    name: 'system_setting'
                }
            ]
        },
        { path: '/test', component: () => import('./views/social/Test.vue') },
        //用户登录
        { path: '/user_login',component: () => import('./views/user/UserLogin.vue') , name: 'user_login' },
        //用户注册
        { path: '/user_register', component: () => import('./views/user/UserRegister.vue'), name: 'user_register' },
        //重置密码
        { path: '/reset_password', component: () => import('./views/user/ResetPassword.vue'), name: '/reset_password' },
        //关于我们
        { path: '/about_us', component: () => import('./views/system/AboutUs.vue'), name: 'about_us' },
        //更新日志
        { path: '/update_log', component: () => import('./views/system/UpdateLog.vue'), name: 'update_log' },
        //个人中心
        { path: '/person_center', component: () => import('./views/user/PersonCenter.vue'), name: 'person_center' },

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