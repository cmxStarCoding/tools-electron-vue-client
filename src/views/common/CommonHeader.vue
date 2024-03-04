<template>
    <div class="header_content">
        <div class="site_logo" @click="this.$router.push({path:'/home'})">
            <img src="../../assets/images/70_70.png" alt="">
            <span>阿狸工具</span>
        </div>

        <div class="header_right">
            <div class="open_member" v-if="false" @click="this.$router.push({ path: '/recharge_vip' })" :class="{'active':$route.path == '/recharge_vip'}">
                <img src="../../assets/images/VIP.png" alt="">
                <span v-show="false">VIP用户</span>
                <span>开通VIP</span>
            </div>
            <div class="record" v-if="is_login" @click="this.$router.push({ path: '/use_tool_record' })" :class="{'active':$route.path == '/use_tool_record'}">
                <img src="../../assets/images/record.png" alt="">
                <span>使用记录</span>
            </div>
            <div class="task" v-if="is_login" @click="this.$router.push({ path: '/task_list' })" :class="{'active':$route.path == '/task_list'}">
                <img src="../../assets/images/task.png" alt="">
                <span>任务记录</span>
            </div>
            <div class="person_center">
                <div class="avatar" v-if="is_login" @click="this.$router.push({ path: '/person_center' })" :class="{'active':$route.path == '/person_center'}">
                    <div class="avatar-container">
                        <img :src="user_info.avatar_url" alt="" >
                    </div>
                    <span>{{ user_info.nickname }}</span>
                </div>
                <span class="login" v-if="!is_login" @click="this.$router.push({ path: '/user_login' })" :class="{'active':$route.path == '/user_login'}">登录</span>
            </div>
        </div>
    </div>
</template>
  
<script>

import Storage from '../../models/storage'
import VueEvent from '../../models/event.js'

export default {

    mounted() {
        VueEvent.on("to-common-header-login", (data) => {
            Storage.set('user_info',JSON.stringify(data.response.data.user_info))
            Storage.set('user_token',data.response.data.jtw_token)
            this.user_info = data.response.data.user_info;
            this.is_login = true;
        })
        VueEvent.on("to-common-header-logout", () => {
            this.user_info = {};
            Storage.remove("user_token")
            Storage.remove("user_info")
            this.is_login = false;
        })
        VueEvent.on("edit-user-profile", (data) => {
            this.user_info = {};
            let userProfile = JSON.parse(Storage.get("user_info"))
            switch (data.key) {
                case "nickname":
                    userProfile.nickname = data.value
                    break;
                case "avatar_url":
                    userProfile.avatar_url = data.value
                    break;
            
                default:
                    break;
            }
            this.user_info = userProfile
            Storage.set('user_info',JSON.stringify(userProfile))
        })

        VueEvent.on("to-common-header-token-expire", () => {
            this.user_info = {};
            Storage.remove("user_token")
            Storage.remove("user_info")
            this.is_login = false;
        })

    },
    data() {
        return {
            user_info:JSON.parse(Storage.get("user_info")),
            is_login:Storage.get("user_info") != null ? true :false
        }
    },
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header_content {
    background-color: rgb(255, 255, 255);
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, .06);
    display: flex;
    height: 65px;
    border: none;
    // color: #495366;
    font-size: 15px;
}

.site_logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 15px;
    width: 40vh;
    cursor: pointer;
  
    img {
        width: 24px;
        height: 24px;
        margin-right: 3px;
    }

    span {
        font-weight: bold;
    }

}

.header_right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
}

.record,
.task,
.open_member{
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 15px;

    img {
        width: 24px;
        margin-right: 10px;
        border-radius: 50%
    }
    color: #3498db;

}

.avatar {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 15px;
    color: #3498db;
    .avatar-container{
        width: 24px;
        height: 24px;
        margin-right: 5px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%
        }
    }
}

.person_center {
    display: flex;
    align-items: center; //垂直对齐
    .avatar {
        display: flex;
        span {
            align-items: center; //垂直对齐
            font-weight: bold;
        }
    }
}

.login {
    display: flex;
    font-weight: bold;
    color: #3498db;
    cursor: pointer;
    margin-right: 10px;
}
.active{
    background-color:#DCDFE6;
    border-radius: 7%;
    font-weight: bold;
    padding: 4px 8px;
}

</style>
  