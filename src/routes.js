import { createRouter, createWebHashHistory } from 'vue-router'

//测试组件
import SystemUpdate from "./views/test/SystemUpdate.vue"
import UploadProcess from "./views/test/UploadProcess.vue"

// import Home from "./views/Home.vue"
import ChatPage from "./views/ChatPage.vue"
import UserLogin from "./views/user/UserLogin.vue"
import UserRegister from "./views/user/UserRegister.vue"
import ResetPassword from "./views/user/ResetPassword.vue"
// import SystemSetting from "./views/system/Setting.vue"
import AboutUs from "./views/system/AboutUs.vue"
import UpdateLog from "./views/system/UpdateLog.vue"
import PersonCenter from "./views/user/PersonCenter.vue"
import RechargeVip from "./views/vip/RechargeVip.vue"
import UseToolRecord from "./views/user/UseToolRecord.vue"
import TaskList from "./views/user/TaskList.vue"
import PicPaste from "./views/tools/PicPaste.vue"
import PdfToWord from "./views/tools/PdfToWord.vue"
import WordToPdf from "./views/tools/WordToPdf.vue"
// import GroupFriendAndNew from "./views/social/GroupFriendAndNew.vue"
import Test from "./views/social/Test.vue"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [

        //测试路由-系统更新
        { path: '/system_update', component: SystemUpdate, name: 'system_update' },
        //测试路由-下载文件展示进度
        { path: '/upload_process', component: UploadProcess, name: 'upload_process' },

        { path: '/', redirect: "/chat" },
        // { path: '/chat', component: ChatPage },
        {
            path: '/chat', component: ChatPage,
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

        //我的群列表、好友列表，新朋友列表
        // { path: '/group_friend_and_new_friend', component: GroupFriendAndNew },
        { path: '/test', component: Test },


        //用户登录
        { path: '/user_login', component: UserLogin, name: 'user_login' },
        //用户注册
        { path: '/user_register', component: UserRegister, name: 'user_register' },
        //重置密码
        { path: '/reset_password', component: ResetPassword, name: '/reset_password' },


        //系统设置
        // { path: '/system_setting', component: SystemSetting, name: 'system_setting' },
        //关于我们
        { path: '/about_us', component: AboutUs, name: 'about_us' },
        //关于我们
        { path: '/update_log', component: UpdateLog, name: 'update_log' },
        //个人中心
        { path: '/person_center', component: PersonCenter, name: 'person_center' },
        //vip充值
        { path: '/recharge_vip', component: RechargeVip, name: 'recharge_vip' },
        //使用记录
        { path: '/use_tool_record', component: UseToolRecord, name: 'use_tool_record' },
        //任务列表
        { path: '/task_list', component: TaskList, name: 'task_list' },
        //贴图工具
        { path: '/pic_paste', component: PicPaste, name: 'pic_paste' },
        //Pdf转Word
        { path: '/pdf_to_word', component: PdfToWord, name: 'pdf_to_word' },
        //Word转Pdf
        { path: '/word_to_pdf', component: WordToPdf, name: 'word_to_pdf' }
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