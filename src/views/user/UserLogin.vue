<template>
    <div class="container">
        <div class="title">
            <span>用户登录</span>
        </div>
        <div class="form_item">
            <div class="form_item_title">
                <span>账号：</span> 
            </div>
            <div>
                <input type="text" placeholder="请输入账号" v-model="userLogonFormData.account">
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
import VueEvent from '../../models/event.js'

export default {
    name: 'UserLogin',
    components: {
        AlertComponent
    },
    data() {
        return {
            userLogonFormData:{
                account:"",
                password:""
            }
        }
    },
    methods: {
        login(){
            apiService.UserLoginApi(this.userLogonFormData).then(response => {
                VueEvent.emit("to-common-header-login",{
                    response:response
                });
                this.showAlert("登录成功")
                setTimeout(() => {
                    this.$router.push({path:'/home'})
                }, 500);

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
    font-size: 13px;
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
    border-bottom:1px solid rgb(239, 239, 239);
}
.form_item_title{
    display: flex;
    width: 40%;
    justify-content: flex-end;
    margin-right: 10px;
    font-weight: bold;
}

input{
    border: 1px solid rgb(218, 218, 218);
    height: 25px;
    width: 200px;
    border-radius: 5px; 
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
        border: 1px solid rgb(88, 232, 69);
        color: rgb(88, 232, 69);
        margin-right: 37px;
        padding: 2px 13px 2px 13px;
    }

    .login_button{
        color: white;
        border: none;
        background-color: rgb(88, 232, 69);
        padding: 2px 30px 2px 30px;
        width: 100px;

    }
}
.forget_password{
    color: royalblue;
    margin-left: 15px;
    cursor: pointer;
}
</style>
  