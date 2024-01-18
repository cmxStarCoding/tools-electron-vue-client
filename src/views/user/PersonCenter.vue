<template>
    <div>
        <div class="person_center_content">
        <div class="title">
            <span>个人中心</span>
        </div>
        <div class="account">
            <div class="setting_name">
                <span>账号：</span>
            </div>
            <div class="setting_ele">
                <span>15638276200</span>
            </div>
        </div>
        <div class="avatar">
            <div class="setting_name">
                <span>头像：</span>
            </div>
            <div class="setting_ele">
                <div class="avatar_box">
                    <img src="../../assets/avatar1.png" alt="">
                </div>
                <button>修改</button>
            </div>
        </div>
        <div class="nickname">
            <div class="setting_name">
                <span>昵称：</span>
            </div>
            <div class="setting_ele">
                <span v-if="show_edit_nicknanme_button">倔强的蜗牛1231</span>
                <input type="text" value="倔强的蜗牛1231" class="nickname_input" v-if="show_save_nicknanme_button">
                <button v-if="show_edit_nicknanme_button" @click="edit_nickname">修改</button>
                <button v-if="show_save_nicknanme_button" @click="save_nickname">保存</button>
            </div>
        </div>
        <div class="password">
            <div class="setting_name">
                <span>密码：</span>
            </div>
            <div class="setting_ele">
                <span>******</span>
                <button>修改</button>
            </div>
        </div>
    </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            show_save_nicknanme_button:false,
            show_edit_nicknanme_button:true
        }
    },
    methods: {
        edit_nickname(){
            this.show_save_nicknanme_button = true
            this.show_edit_nicknanme_button = false
        },
        save_nickname(){
            this.show_save_nicknanme_button = false
            this.show_edit_nicknanme_button = true
        }
    },
}
</script>

<style lang="scss" scoped>
    .person_center_content{
                // background-color: red;
        display: flex;
        flex-direction: column;
        font-size: 13px;
        color: #495366;
        .title{
            padding-bottom: 20px;
        }    
    }

    .setting_name{
        display: flex;
        width: 40%;
        justify-content: flex-end; //主轴对齐方式
        padding-right: 20px;
    }


    .avatar,.nickname,.password,.account{
        border-bottom:1px solid rgb(239, 239, 239);
        display: flex;
        align-items: center;
        padding: 30px 0px 30px 0px;
    }
    .setting_ele{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-right: 250px;
    }

    .nickname_input{
        border: 1px solid rgb(218, 218, 218);
        height: 25px;
        border-radius: 3px;
    }
    .avatar_box{
        width: 50px;
        height: 50px;
        border-radius: 25px;
        img{
            width: 50px;
        }
    }

    button{
        border: 1px solid rgb(218, 218, 218);
        padding: 3px 15px 3px 15px;
    }

</style>