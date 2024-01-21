<template>
    <div class="header_content">
        <div class="header_left">
            <div class="site_title">
                <div class="site_logo">
                    <img src="../../assets/images/icon.png" alt="">
                    <span>阿狸工具</span>
                </div>
            </div>
        </div>



        <div class="header_right">
            <!-- <div class="open_member">
                <div class="vip_icon" v-if="isLogin">
                    <img src="../../assets/images/VIP.png" alt="">
                    <span v-show="false">VIP用户</span>
                    <span @click="this.$router.push({path:'/recharge_vip'})">开通VIP</span>
                </div> -->
            <!-- </div> -->

            <div class="person_center" >
                <div class="userinfo" >
                    <div class="avatar" v-if="isLogin" @click="this.$router.push({path:'/person_center'})">
                        <img src="../../assets/images/avatar1.png" alt="">
                        <span>奔跑的蜗牛</span> 
                    </div>
                    <span class="login" v-if="!isLogin" @click="this.$router.push({path:'/user_login'})">登录</span>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script>

import Storage from '../../models/storage'

export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    computed: {
        isLogin(){
            let userinfo = Storage.get("user_info")
            return userinfo ? true :false
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
    color: #495366;
    font-size: 15px;
    .header_left {
        display: flex;
        // background-color: green;
        justify-content: flex-start;
        .site_title {
            padding-left: 15px;
            display: flex;
            cursor: pointer;

            .site_logo {
                display: flex;
                align-items: center;

                img {
                    width: 24px;
                    height: 24px;
                    margin-right: 5px;
                }

                span {
                    font-weight: bold;
                }
            }

        }
    }
    .header_right {
        display: flex;
        flex: auto;
        justify-content: flex-end;
        font-size: 15px;
        .open_member {
            cursor: pointer;
            display: flex;
            // background-color: yellow;
            padding-right: 10px;

            .vip_icon {
                display: flex;
                align-items: center;

                span {
                    font-weight: bold;
                    width: 60px;
                }
            }

            img {
                width: 24px;
                height: 24px;
                margin-right: 5px;
            }
        }

        .person_center {
            display: flex;
            align-items: center; //垂直对齐
            // background-color: red;
            padding-right: 10px;
            
            .userinfo {
                display: flex;
                align-items: center;
                .avatar {
                    display: flex;
                    border-radius: 12px;
                    align-items: center;
                    cursor: pointer;
                    img {
                        width: 24px;
                        /* 调整图片宽度，确保高度一致 */
                        height: 24px;
                        /* 调整图片高度，确保高度一致 */
                        margin-right: 5px;
                    }

                    span {
                        font-weight: bold;
                        align-items: center; //垂直对齐
                        font-weight: bold;
                        
                        // width: 150px;
                    }
                }
            }
        }

    }
}
.login{
    display: flex;
    font-weight: bold;
    color: #3498db;
    cursor: pointer;
}
</style>
  