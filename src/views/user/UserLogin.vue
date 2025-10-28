<template>
    <div class="container">
        <!-- <div class="title">
            <span>用户登录</span>
        </div> -->
        <div class="form_item">
            <div class="form_item_title">
                <span>手机号：</span> 
            </div>
            <div>
                <input type="text" placeholder="请输入手机号码" v-model="userLogonFormData.phone">
            </div>
        </div>
        <div class="form_item">
            <div class="form_item_title">
                <span>密码：</span> 
            </div>
            <div>
                <input type="password" placeholder="请输入密码" v-model="userLogonFormData.password"><span class="forget_password" @click="this.$router.push({path:'/reset_password'})">忘记密码</span>
            </div>
        </div>
        <div class="form_item">
            <div class="form_item_title">
                <span></span> 
            </div>
            <div class="reg_login_button">
                <button @click="this.$router.push({path:'/user_register'})" class="reg_button">注册</button>
                <button class="login_button" @click="login">登录</button>
            </div>

        </div>
        <AlertComponent :config="alertConfig"></AlertComponent>

    </div>
</template>
  
<script>

import apiService from '../../models/axios'
import AlertComponent from '../../components/AlertComponent.vue'
// import VueEvent from '../../models/event.js'
import LocalStorage from '../../models/storage'
export default {
    name: 'UserLogin',
    components: {
        AlertComponent
    },
    data() {
        return {
            userLogonFormData:{
                phone:"15638276200",
                password:"123456"
            }
        }
    },
    methods: {
        login(){
            apiService.UserLoginApi(this.userLogonFormData).then(response => {
                console.log(response.data.data.token)
                LocalStorage.set('user_token',response.data.data.token)
                apiService.UserDetailApi({}).then(responseData => {
                    console.log("用户信息",responseData)
                    LocalStorage.set('user_info',JSON.stringify(responseData.data.data.info))
                    this.$router.push({path:'/chat'})
                }).catch(err => {
                    this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')            
                })
                
            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')            
            })
        }
    },
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    padding-top: 200px;
    font-size: 12px;
    height: calc(100vh - 30px);
    background-image: url("../../assets/images/login_bgi1.png");
    background-size: cover;          /* 背景图自动缩放以覆盖整个容器 */
    background-repeat: no-repeat;    /* 不重复 */
    background-position: center;     /* 居中显示 */
}

.title{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 10px 0px 10px 0px;
}

.form_item{
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 30px;
    // border-bottom:1px solid rgb(239, 239, 239);
}
.form_item_title{
    display: flex;
    width: 40%;
    justify-content: flex-end;
    margin-right: 10px;
    // font-weight: bold;
}

input{
    border: 1px solid rgb(218, 218, 218);
    height: 25px;
    width: 200px;
    border-radius: 7px; 
    outline: none;
    font-size: 12px;
}
.reg_login_button{
    button{
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
        border-radius: 5px; 
    }
    .reg_button{
        background-color: rgb(242, 242, 242);
        border: none;
        color: rgb(88, 232, 69);
        margin-right: 37px;
        padding: 3px 10px 3px 10px;
    }

    .login_button{
        color: white;
        border: none;
        background-color: rgb(88, 232, 69);
        padding: 3px 20px 3px 20px;
        width: 100px;

    }
}
.forget_password{
    color: royalblue;
    margin-left: 15px;
    cursor: pointer;
}
</style>
  