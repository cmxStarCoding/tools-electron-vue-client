<template>
    <div class="container">
        <div class="title">
            <span>重置密码</span>
        </div>
        <div class="form_item">
            <div class="form_item_title">
                <span>您的账号：</span>
            </div>
            <div>
                <input type="text" placeholder="请输入账号" v-model="resetPasswordform.account">
            </div>
        </div>
        <div class="form_item">
            <div class="form_item_title">
                <span>您的新密码：</span>
            </div>
            <div>
                <input type="password" placeholder="请输入密码" v-model="resetPasswordform.new_password">
            </div>
        </div>
        <div class="form_item">
            <div class="form_item_title">
                <span>确认新密码：</span>
            </div>
            <div>
                <input type="password" placeholder="请再次输入密码" v-model="resetPasswordform.confirm_password">
            </div>
        </div>
        <div class="form_item">
            <div class="form_item_title">
                <span>验证邮箱：</span>
            </div>
            <div>
                <input type="text" placeholder="请输入您的邮箱" v-model="resetPasswordform.use_email">
                <span class="resendEmail" @click="resendEmail" v-if="shwoResendEmail">{{ resendEmailCountdown }}秒后重从发送</span>
                <span class="sendCode" v-if="showSendEmail" @click="sendEmail">发送邮箱验证码</span>
            </div>
        </div>
        <div class="form_item">
            <div class="form_item_title">
                <span>验证码：</span>
            </div>
            <div>
                <input type="text" placeholder="请输入邮箱接收的验证码" v-model="resetPasswordform.email_code">
            </div>
        </div>
        <div class="form_item">
            <div class="form_item_title">
                <span></span>
            </div>
            <div class="resetbutton">
                <button @click="resetPassword">重置密码</button>
            </div>
        </div>
        <AlertComponent :config="alertConfig"></AlertComponent>

    </div>
</template>
  
<script>
import AlertComponent from '../../components/AlertComponent.vue';
import apiService from '../../models/axios'
export default {

    components: {
        AlertComponent
    },
    data() {
        return {
            shwoResendEmail: false,
            showSendEmail: true,
            resendEmailCountdown: 60,
            resetPasswordform: {}
        }
    },
    methods: {
        sendEmail() {
            apiService.SendEmailApi(this.resetPasswordform).then(() => {
                this.showAlert("发送成功")
                this.showSendEmail = false
                this.shwoResendEmail = true
                setInterval(() => {
                    if (this.resendEmailCountdown <= 0) {
                        clearInterval
                        this.showSendEmail = true
                        this.shwoResendEmail = false
                    } else {
                        this.resendEmailCountdown--
                    }
                }, 1000)
            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        resetPassword() {
            apiService.ForgetPasswordResetApi(this.resetPasswordform).then(() => {
                this.showAlert("重置成功")
                setTimeout(() => {
                    this.$router.push({ path: '/user_login' })
                }, 1200)
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

.title {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 10px 0px 10px 0px;
}

.form_item {
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 30px;
    border-bottom: 1px solid rgb(239, 239, 239);
}

.form_item_title {
    display: flex;
    width: 40%;
    justify-content: flex-end;
    margin-right: 10px;
}

input {
    border: 1px solid rgb(218, 218, 218);
    height: 25px;
    width: 200px;
    border-radius: 5px;
}

.resetbutton {
    display: flex;

    button {
        padding: 5px 62px;
        background-color: rgb(104, 215, 163);
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
}

.sendCode {
    margin-left: 15px;
    cursor: pointer;
    color: darkcyan;
}</style>
  